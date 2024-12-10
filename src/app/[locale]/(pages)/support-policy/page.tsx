import Breadcrumb from "@/components/breadCrumb";

export default function RefundPolicy() {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-bg_color py-6">
        <div className="container flex items-start justify-start p-2">
          <Breadcrumb
            items={[
              { label: "Home", value: "/" },
              { label: "support-policy", value: "/support-policy" },
            ]}
          />
        </div>
        <div className="container bg-white py-6 px-4 rounded text-gray-500 gap-4">
          <div className="flex items-start justify-start flex-col gap-2">
            <p className="text-sm">Disclaimer and Limitation of Liability:</p>
            <ul className="flex items-start justify-start gap-2 flex-col text-xs font-normal pl-2">
              <li>
                The TikTokShop Global Service and all information, content,
                materials, products (including software) and other services
                included in or otherwise made available to you through the
                TikTokShop Global Service are provided by TikTokShop Global on
                an "as is" and "as available" basis, unless otherwise stated in
                writing. TikTokShop Global makes no representations or
                warranties, express or implied, as to the operation of the
                TikTokShop Global Service or the information, content,
                materials, products (including software) or other services
                included in or otherwise made available through the DHL.PS
                Global Service, unless otherwise stated in writing. You
                expressly agree that your use of the DHL.PS Global Service is at
                your sole risk.
              </li>
              <li>
                To the fullest extent permitted by law, TikTokShop Global
                disclaims all warranties, express or implied, including, but not
                limited to, the implied warranties of merchantability and
                fitness for a particular purpose. TikTokShop Global does not
                warrant that the TikTokShop Global Service, information,
                content, materials, products (including software) or products
                included in or through the TikTokShop Global Service, TikTokShop
                Global servers, or TikTokShop Global electronic communications
                sent to you are free of viruses or other harmful components. To
                the maximum extent permitted by law, TikTokShop Global does not
                assume any responsibility for the use of any TikTokShop Global
                Service or any information, content, materials,
              </li>
              <li>Website Policies, Modifications and Severability</li>
              <li>
                Please review our other policies posted on this website, such as
                our pricing policy. These policies also apply to your use of the
                TikTokShop Global Service. We reserve the right to change our
                website, policies, terms of service and these conditions of use
                at any time.
              </li>
              <li>
                If any of these conditions is deemed invalid, void or
                unenforceable for any reason, then that condition shall be
                deemed severable and shall not affect the validity and
                enforceability of any remaining condition.
              </li>
              <li>Our website: https://tiktokshop.online</li>
              <li>Email: admin@tiktokshop.online</li>
              <li>TikTokShop Global Software Additional Terms</li>
              <li>
                The following terms ("Software Terms") apply to any software
                (including any updates or upgrades to the software) and any
                related documentation we provide to you in connection with the
                TikTokShop Global Service ("TikTokShop Global Software").
              </li>
              <li>
                1. Use of TikTokShop Global Software. You may only use the
                TikTokShop Software for the purpose of enabling you to use the
                TikTokShop services provided by TikTokShop and as permitted by
                these Conditions of Use and any Terms of Service. You may not
                incorporate any part of the DHL.PS Software into another
                program, compile any part of it with another program, or
                otherwise copy (except to exercise the rights granted in this
                section), modify, create derivative works, distribute, transfer,
                or license any rights in the TikTokShop Global Software in whole
                or in part.
              </li>
              <li>
                2. Use of Third-Party Services. When you use the TikTokShop
                Software, you may also be using the services of one or more
                third parties, such as wireless carriers or mobile software
                providers. Your use of these third-party services may be subject
                to the separate policies, terms of use, and fees of these third
                parties.
              </li>
              <li>
                3. No Reverse Engineering. You may not reverse engineer,
                decompile or disassemble, modify or bypass any security measures
                associated with the TikTokShop Software, whether in whole or in
                part.
              </li>
              <li>
                4. Updates. We may provide automatic or manual updates to the
                DHL.PS Software at any time without notice.
              </li>
              <li>
                5. Conflicts. If these Conditions of Use conflict with any other
                DHL.PS or third-party terms (e.g., open source license terms)
                applicable to any portion of the DHL.PS Software, such other
                terms will control to the extent that portion conflicts with the
                DHL.PS Global Software.
              </li>
              <li className="font-medium">
                How to Serve Subpoenas or Other Legal Process
              </li>
              <li>
                TikTokShop accepts service of subpoenas or other legal process
                only through TikTokShops National Registered Agent Company
                Service (CSC). Subpoenas or other legal process may be served by
                sending them to CSC:
              </li>
              <li>Email: info@tiktokshop.online</li>
              <li>
                Please also note that providing detailed and accurate
                information at the outset will assist you in efficiently
                processing your request. This information will include, for
                example, email and/or credit card number for retail purchase
                information; the sellers name, email address, and device serial
                number; and IP address and full timestamp
              </li>
              <li>
                Notice and Procedure for Intellectual Property Infringement
                Claims
                <br />
                If you believe that your intellectual property rights have been
                infringed, please submit your complaint using our online form.
                This form may be used to report all types of intellectual
                property claims, including, but not limited to, copyright,
                trademark, and patent claims.
              </li>
              <li>
                We will respond promptly to rights holders concerns regarding
                any alleged infringement and terminate repeat infringers where
                appropriate.
              </li>
              <li>
                We offer the following alternative to the online form for
                copyright complaints only. You may submit a written claim of
                copyright infringement to our Copyright Agent as follows:
              </li>
              <li>
                Written claims of copyright infringement must include the
                following information:
                <br />• A physical or electronic signature of a person
                authorized to act on behalf of the copyright owner;
                <br />• A description of the copyrighted work that you claim has
                been infringed;
                <br />• Identification of where the material that you claim is
                infringing is located on the Site;
                <br />• Your address, telephone number, and email address;
                <br />• A statement by you that you have a good faith belief
                that the disputed use is not authorized by the copyright owner,
                its agent, or the law;
                <br />• A statement by you, made under penalty of perjury, that
                the above information in your notice is accurate and that you
                are the copyright owner or authorized to act on the copyright
                owner's behalf.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
