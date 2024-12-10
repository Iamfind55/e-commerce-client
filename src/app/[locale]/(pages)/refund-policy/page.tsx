import Breadcrumb from "@/components/breadCrumb";

export default function RefundPolicy() {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "refund-policy", value: "/refund-policy" },
            ]}
          />
        </div>
        <div className="container bg-white py-6 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">1. Apply for Return/Refund:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                According to the terms and conditions of this "Refund and Return
                Policy" which constitute part of the "Terms of Service", the
                Buyer may apply for a return of the purchased goods (hereinafter
                referred to as "Goods") and/or a refund before the expiration of
                the "TikTokShop Performance Guarantee Period" set out in these
                Terms of Service.
              </li>
              <li>
                [TikTokShop Performance Guarantee" is a service provided by
                TikTokShop, which can assist users in dealing with conflicts
                that may arise during the transaction process upon their
                request. Before, during or after using the TikTokShop
                Performance Guarantee, users can resolve disputes through
                friendly negotiations, or seek assistance from relevant local
                authorities to resolve any disputes.
              </li>
            </ul>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 mt-4">
            <p className="text-sm">2. Refund Conditions:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                The buyer hereby agrees that a refund can only be requested
                under the "TikTokShop Performance Guarantee" or this Refund and
                Return Policy in the following circumstances:
                <br />
                (1). The buyer has not received the product;
                <br />
                (2). The product is defective and/or damaged during delivery;
                <br />
                (3). The seller sends the buyer a product that does not meet the
                agreed specifications (such as the wrong size, color, etc.);
                <br />
                (4). The product received by the buyer does not substantially
                match the product description posted by the seller;
                <br />
                (5). According to the private agreement reached with the seller,
                the seller must send TikTokShop its confirmation of the
                agreement at this time.
                <br />
                The buyer's application for a refund must be submitted through
                the TikTokShop platform. TikTokShopL will review each
                application of the buyer on a case-by-case basis and decide at
                its sole discretion whether to approve the buyer's application
                based on the above conditions and these Terms of Service.
                <br />
                When the buyer files a lawsuit against the seller, the buyer may
                provide TikTokShopL with a formal notice from the relevant
                government to request DHL to continue to hold the purchase funds
                for the disputed transaction until a formal ruling is made.
                TikTokShop may, in its sole discretion, determine whether it is
                necessary to continue holding the purchase funds.
              </li>
              <li></li>
              <li>Your item must be:</li>
              <li>Unused and with all original components;</li>
              <li>In original packaging (with tags, if applicable);</li>
              <li>In resale condition;</li>
              <li>With proof of purchase;</li>
              <li>To be used with any gifts that came with the product.</li>
              <li>
                Refunds will be processed through the original payment method.
                If you paid with USDT or ETH, please allow one business day for
                your payment to appear in your account; With bank wire, refunds
                may take up to 30 days, depending on your bank.
              </li>
              <li>Product Support</li>
              <li>
                In most cases, if you have a problem with an item, you can check
                our product support site from the comfort of your home to see if
                we can resolve the issue. There, you can access FAQs about the
                product and our company, shipping and pickup, returns, and
                refunds.
              </li>
              <li>There's a problem with my item</li>
              <li>
                If you still need to return your item (within the first 15
                days), we will offer you an exchange, replacement or refund.
              </li>
              <li>
                After this period, as long as the product is still under
                warranty, we will arrange a repair using our professional repair
                agents, or, if repair is not possible, replace or exchange your
                item. The fastest way to return your item is through our global
                warehouse centers in 112 countries. We can accept most items
                except large items, even if they were originally delivered to
                your door. Find your nearest store. If you are returning a large
                item, scroll down to start a live chat or go to our helpline
                link.
              </li>
              <li>
                Precautions:
                <br />
                Certain items, such as food, pierced jewelry and underwear, can
                only be exchanged or refunded if they are defective. Our website
                will indicate which items are non-refundable.
              </li>
              <li>
                If you are returning DVD, music or software products, they must
                be unused and in their original sealed packaging.
                <br />
                We reserve the right to reduce the amount of your refund if the
                item or packaging is severely damaged.
                <br />
                We may ask for the product serial number or similar information
                to check that we have provided the item.
              </li>
              <li>
                Of course, none of this affects your consumer rights.
                <br />
                If we collect your goods, we will inspect them before refunding
                you. Please note that if the goods have been inspected but not
                returned as described, we reserve the right to refuse a refund
                or provide a partial refund depending on the condition of the
                returned goods.
              </li>
              <li>
                FAQ
                <br />
                How long will my refund take?
              </li>
              <li>
                If you return the item to a store, we can refund you
                immediately. It takes one business day to be processed into your
                account. If you paid by bank wire, you will receive your refund
                via bank wire, which may take up to 30 days, depending on your
                bank.
              </li>
              <li>
                If you return the item to a store, we can refund you
                immediately. It takes one business day to be processed into your
                account. If you paid by bank wire, you will receive your refund
                via bank wire, which may take up to 30 days, depending on your
                bank.
              </li>
              <li>
                Remember, all returned items must comply with our return policy
                and must be in the original packaging, unused, and accompanied
                by proof of purchase.
              </li>
              <li>What counts as proof of purchase?</li>
              <li>These proofs are:</li>
              <li>Cash register receipt;</li>
              <li>Electronic receipt;</li>
              <li>Your order number;</li>
              <li>Email confirmation.</li>
              <li>
                If you can't find any of the above, don't worry. We should be
                able to resolve any issues if you have:
              </li>
              <li>Your transaction slip;</li>
              <li>The email address used to purchase the item.</li>
              <li>If there is no problem, can I return it?</li>
              <li>
                This product can be returned to any store under our return
                policy.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
