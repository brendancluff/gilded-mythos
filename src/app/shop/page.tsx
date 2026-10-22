
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Gilded Mythos",
  description:
    "Discover official Gilded Mythos merchandise and support the creators.",
};

export default function ShopPage() {
  return (
    <main className="shop-page">
      <section className="shop-hero">
        <p className="eyebrow">THE GILDED MYTHOS COLLECTION</p>

        <h1>The Mythos Shop</h1>

        <p>
          Carry a piece of Alori into your own adventure.
          Explore official merchandise and support the
          creators behind Gilded Mythos.
        </p>
      </section>

      <section className="shop-content">
        <div className="shop-intro">
          <p className="eyebrow">OFFICIAL MERCHANDISE</p>

          <h2>Bring the Mythos Home</h2>

          <p>
            The official Gilded Mythos merchandise
            collection will be available through
            our external storefront.
          </p>
        </div>

        <article className="shop-featured">
          <div className="shop-symbol" aria-hidden="true">
            ✦
          </div>

          <h2>Gilded Mythos Merchandise</h2>

          <p>
            Discover merchandise inspired by
            Gilded Mythos, Kinari Academy,
            and the world of Alori.
          </p>

          <div className="shop-status">
            OFFICIAL SHOP LINK COMING SOON
          </div>

          <p className="shop-note">
            Merchandise purchases will take place
            through an external storefront.
          </p>
        </article>

        <div className="shop-information">
          <div className="shop-info-card">
            <div className="shop-info-symbol" aria-hidden="true">
              ✧
            </div>

            <h3>Support the Creators</h3>

            <p>
              Show your support for the storytellers
              and adventurers who bring the world
              of Alori to life.
            </p>
          </div>

          <div className="shop-info-card">
            <div className="shop-info-symbol" aria-hidden="true">
              ♜
            </div>

            <h3>Official Collections</h3>

            <p>
              Future merchandise collections may
              feature Gilded Mythos podcasts,
              characters, and Kinari Academy Houses.
            </p>
          </div>
        </div>

        <div className="shop-notice">
          <span aria-hidden="true">✦</span>

          <div>
            <h3>Shopping Information</h3>

            <p>
              The Gilded Mythos website will direct
              visitors to the official merchandise
              storefront once the creators provide
              the approved shop link.
            </p>

            <p>
              Payments, shipping, and orders will
              be handled by the external store.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
