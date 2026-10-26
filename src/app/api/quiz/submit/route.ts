
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { calculateSortingResult } from "@/lib/quiz/scoring";

export async function POST(request: Request) {
  try {
    // Authenticate using the user's session cookies.
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to take the quiz." },
        { status: 401 }
      );
    }

    // Validate and score all 18 answers on the server.
    const body = await request.json();

    const result = calculateSortingResult(body?.responses);


if (process.env.QUIZ_TEST_MODE === "true") {
  return NextResponse.json({
    success: true,
    testMode: true,
    primaryHouse: result.primaryHouse,
    secondaryHouse: result.secondaryHouse,
  });
}


    // Use the privileged client only after authentication
    // and server-side scoring have succeeded.
    const admin = createAdminClient();


const { data: connectionTest, error: connectionError } =
  await admin
    .from("houses")
    .select("name")
    .limit(1);

if (connectionError) {
  console.error("Admin connection failed:", connectionError);
} else {
  console.log("Admin connection successful:", connectionTest);
}


    // Atomically assign the Houses exactly once.
    const { data: assigned, error: assignmentError } =
      await admin.rpc("assign_kinari_house", {
        p_user_id: user.id,
        p_primary_house: result.primaryHouse,
        p_secondary_house: result.secondaryHouse,
      });

    if (assignmentError) {
      console.error(
        "House assignment failed:",
        assignmentError
      );

      return NextResponse.json(
        { error: "Unable to save your House assignment." },
        { status: 500 }
      );
    }

    if (assigned !== true) {
      return NextResponse.json(
        {
          error:
            "Your House has already been assigned, or your profile is unavailable.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      primaryHouse: result.primaryHouse,
      secondaryHouse: result.secondaryHouse,
    });
  } catch (error) {
    console.error("Quiz submission failed:", error);

    return NextResponse.json(
      { error: "Invalid quiz submission." },
      { status: 400 }
    );
  }
}
