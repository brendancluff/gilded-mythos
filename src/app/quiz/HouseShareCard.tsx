
"use client";

import { useState } from "react";

type HouseName =
  | "Solara"
  | "Lunaris"
  | "Aetherion"
  | "Spiraxus";

type Props = {
  primaryHouse: HouseName;
  secondaryHouse: HouseName | null;
};

const houseDetails: Record<
  HouseName,
  { image: string; words: string; color: string }
> = {
  Solara: {
    image: "/houses/SOLARA.webp",
    words: "Order · Purpose · Creation",
    color: "#701F2B",
  },
  Lunaris: {
    image: "/houses/LUNARIS.webp",
    words: "Knowledge · Emotion · History",
    color: "#4D869B",
  },
  Aetherion: {
    image: "/houses/AETHERION.webp",
    words: "Change · Growth · Rebirth",
    color: "#245C3B",
  },
  Spiraxus: {
    image: "/houses/SPIRAXUS.webp",
    words: "Ruin · Prophecy · Truth",
    color: "#45205E",
  },
};

export default function HouseShareCard({
  primaryHouse,
  secondaryHouse,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareUrl = "https://gildedmythos.com/quiz";

  async function generateImage(): Promise<Blob> {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to create the image.");
    }

    const houses = [
      primaryHouse,
      ...(secondaryHouse ? [secondaryHouse] : []),
    ];

    const images = await Promise.all(
      houses.map(async (house) => {
        const image = new window.Image();
        image.src = houseDetails[house].image;

        await image.decode();
        return image;
      })
    );

    // Background
    ctx.fillStyle = "#111722";
    ctx.fillRect(0, 0, 1080, 1350);

    // Gold frame
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 8;
    ctx.strokeRect(32, 32, 1016, 1286);

    ctx.textAlign = "center";

    ctx.fillStyle = "#F0D77C";
    ctx.font = "bold 44px Georgia";
    ctx.fillText("KINARI ACADEMY", 540, 115);

    ctx.font = "32px Georgia";
    ctx.fillText("MY HOUSE SORTING RESULT", 540, 175);

    const twoHouses = houses.length === 2;
    const imageWidth = twoHouses ? 420 : 620;
    const imageHeight = twoHouses ? 620 : 760;

    houses.forEach((house, index) => {
      const details = houseDetails[house];

      const centerX = twoHouses
        ? index === 0
          ? 285
          : 795
        : 540;

      const image = images[index];

      // House color behind each crest
      ctx.fillStyle = details.color;
      ctx.globalAlpha = 0.25;
      ctx.fillRect(
        centerX - imageWidth / 2,
        250,
        imageWidth,
        imageHeight
      );
      ctx.globalAlpha = 1;

      // Preserve original image proportions
      const scale = Math.min(
        imageWidth / image.width,
        imageHeight / image.height
      );

      const width = image.width * scale;
      const height = image.height * scale;

      ctx.drawImage(
        image,
        centerX - width / 2,
        250 + (imageHeight - height) / 2,
        width,
        height
      );

      const nameY = twoHouses ? 955 : 1050;

      ctx.fillStyle = "#F0D77C";
      ctx.font = "bold 43px Georgia";
      ctx.fillText(house.toUpperCase(), centerX, nameY);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = twoHouses
        ? "21px Georgia"
        : "28px Georgia";

      ctx.fillText(
        details.words,
        centerX,
        nameY + 50
      );

      ctx.fillStyle = "#88BAC8";
      ctx.font = "24px Georgia";
      ctx.fillText(
        index === 0 ? "PRIMARY HOUSE" : "SECONDARY HOUSE",
        centerX,
        230
      );
    });

    ctx.fillStyle = "#D4AF37";
    ctx.font = "bold 36px Georgia";
    ctx.fillText("GILDED MYTHOS", 540, 1200);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "26px Georgia";
    ctx.fillText(
      "gildedmythos.com/quiz",
      540,
      1250
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Image generation failed."));
        },
        "image/png"
      );
    });
  }

  async function downloadImage() {
    setBusy(true);
    setError(null);

    try {
      const blob = await generateImage();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "kinari-academy-house-result.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch {
      setError("Unable to download your result.");
    } finally {
      setBusy(false);
    }
  }

  async function shareImage() {
    setBusy(true);
    setError(null);

    try {
      const blob = await generateImage();

      const file = new File(
        [blob],
        "kinari-academy-house-result.png",
        { type: "image/png" }
      );

      const text =
        `I was sorted into ${primaryHouse}` +
        (secondaryHouse
          ? ` with ${secondaryHouse} as my secondary House!`
          : "!") +
        " Discover your House at Kinari Academy.";

      if (
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "My Kinari Academy House",
          text,
          url: shareUrl,
        });
      } else {
        setError(
          "Direct image sharing isn't supported here. " +
          "Use Download My Result to save and post your image."
        );
      }
    } catch (err) {
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        return;
      }

      setError("Unable to share your result.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="house-share-actions">
      <h3>Share Your Sorting Result</h3>

      <p>
        Show your friends where you belong
        at Kinari Academy!
      </p>

      <div className="house-share-buttons">
        <button
          type="button"
          onClick={shareImage}
          disabled={busy}
        >
          Share My House
        </button>

        <button
          type="button"
          onClick={downloadImage}
          disabled={busy}
        >
          Download My Result
        </button>
      </div>

      {error && <p role="status">{error}</p>}
    </div>
  );
}
