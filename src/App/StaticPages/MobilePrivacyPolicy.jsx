import React from 'react'
import AppLink from '../../Common/AppLink';
import "./Privacy.scss";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="loginContent edContainer">
        <div className="privacy-policy-custom mt-80">
          <h1 className="sub-heading text-sm w-600 mb-20">PRIVACY POLICY FOR MOBILE APPLICATION DEVELOPED BY “EDNEED”</h1>
          <p className="text-xxs">
            This privacy statement applies to the online and mobile application (the "Application") that Edneed Technology Pvt. Ltd. developed for Educational Institutions, especially Schools. The software makes it easier for parents and school officials to get information on their children and the schools.
          </p>
          <p className="text-xxs">
            What data does the application collect, and how does it use that data?
          </p>
          {/* <p className="text-xxs">
            This Privacy Policy (“Agreement”) is between{" "}
            <span className="w-700">Edneed Technology Private Limited</span> (“
            <span className="w-700">Edneed</span>”, “
            <span className="w-700">Company</span>”) and You (“
            <span className="w-700">You</span>”, “
            <span className="w-700">Your</span>”).
          </p> */}
          <div className="olCounter">
            <ol>
              <li>
                <h3 className="text-xs primary">User-Provided Information </h3>
                <p className="text-xxs">
                  When you download and register the application, the information you give is what the application uses. It's optional to register with us. However, bear in mind that until you register with us, you might not be able to access all of the services provided by the Application.
                </p>
                <p className="text-xxs">
                  You typically give us the following information when you register with us and use the Application: (a) your name, email address, age, password, and other registration information; (b) transaction-related information, like when you access documents or messages from us; (c) information you give us when you contact us for help; and (d) information you enter into our system when using the Application, like contact information and project management information.

                </p>
                <p className="text-xxs">
                  We could occasionally get in touch with you using the information you gave us to let you know about essential updates and necessary alerts.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Automatically Collected Information
                </h3>
                <p className="text-xxs">
                  Additionally, the application may automatically gather some information about you, such as the kind of mobile device you use, its unique device ID, its IP address, the mobile operating system, and details about how you use the application.

                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Tracking & Cookies Data
                </h3>
                <p className="text-xxs">
                  We track activities on our Service and store some information using cookies and other tracking technologies.
                </p>
                <p className="text-xxs">
                  Cookies are little data files that may contain an anonymous unique identifier. Cookies are little text files that a website sends to your browser and stores there. Beacons, tags, and scripts are additional tracking technologies used to gather data, follow users, and analyze and enhance our service.
                </p>
                <p className="text-xxs">
                  You may tell your browser to always reject cookies or to let you know when one is being sent. However, you might not be able to utilize all of our Services if you refuse to accept cookies.
                </p>
                <p className="text-xxs">
                  Session Cookies. We use Session Cookies to operate our Service.
                  Preference Cookies. We use Preference Cookies to remember your preferences and various settings.

                </p>
                <p className="text-xxs">
                  Security Cookies. We use Security Cookies for security purposes.

                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Use of Data
                </h3>
                <ol className="text-xxs nest-1">
                  <li>
                    The data is used by School App for a number of things, including:
                  </li>
                  <li>
                    to provide and keep up the Service.
                  </li>
                  <li>
                    to let you know when we make changes to our service.
                  </li>
                  <li>
                    to make it possible for you to take part in our Service's interactive features at your discretion.
                  </li>
                  <li>
                    to offer help and attention to customers.
                  </li>
                  <li>
                    to offer research or important data so we can enhance the Service.
                  </li>
                  <li>
                    to keep an eye on how the Service is used.
                  </li>
                  <li>
                    to identify, stop, and fix technological problems.
                  </li>
                </ol>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Does the application gather the device's precise real-time location data?
                </h3>
                <p className="text-xxs">
                  The specific location of your mobile device is not collected by this application.
                </p>
                <p className="text-xxs">
                  Do outside parties have access to or see the information that the application has collected?
                </p>
                <p className="text-xxs">
                  Other than what is stated in this privacy statement, we will not disclose your information to any third parties.
                </p>
                <p className="text-xxs">
                  User-provided and automatically collected data that we may make public include:
                </p>
                <ol className="text-xxs nest-1">
                  <li>
                    where we think in good faith that disclosure is necessary to preserve our rights, safeguard your safety or the safety of others, investigate fraud, or comply with a government request; as required by law, such as to comply with a subpoena or similar legal process;
                  </li>
                  <li>
                    You will be informed through email and/or a conspicuous notice on our website of any change in ownership or uses of your information, as well as any choices you may have regarding this information if Edneed Technology Pvt. Ltd. is engaged in a merger, acquisition, or sale of all or a portion of its assets.
                  </li>
                  <li>
                    Regardless of anything else stated in this policy, we may collaborate with partners who employ mobile SDKs, such as the OneSignal Messaging SDK, to passively gather information (referred to as "SDK Information"), which typically aids us in delivering tailored alerts. For the purpose of tailoring advertisements or content for you, this information may also be used to uniquely identify you across different devices or browsers. This data may include personally identifiable information (PII), such as your email address, depending on the permissions provided to this application. Additionally, this data may consist of your specific position (i.e., GPS-level data), WiFi information, installed and activated apps, and your mobile identification number (e.g., Android Advertising ID).

                  </li>
                </ol>
              </li>
              <h2 className="sub-heading text-sm w-600 mb-20">
                Opt-out options
              </h2>
              <li>
                <h3 className="text-xs primary">
                  Opting out of Push notifications

                </h3>
                <p className="text-xxs">
                  Most of the time, you may choose not to get push notifications by going to "Settings" on your smartphone, selecting "Notifications," and then adjusting the settings for some or all of the applications there. (These parameters may be affected or changed by various device setups or upgrades.)

                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Opt-out rights
                </h3>
                <p className="text-xxs">
                  By deleting the application, you may quickly cease all information collected by it. You can utilize the usual uninstall procedures that may be included with your mobile device or accessible through the network or marketplace for mobile applications. You may also email <a href="https://api.whatsapp.com/send?phone=918368214889&text=Hi,%20There!" target="_blank" rel="noreferrer" >support@edneed.com</a> to request to opt-out.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Data Retention Policy, Managing your Information

                </h3>
                <p className="text-xxs">
                  User-provided data will be kept by us for as long as you use the application and for a reasonable amount of time after that. We may save automatically collected data in aggregate after the initial 24 months of storage. Please email us at <a href="https://api.whatsapp.com/send?phone=918368214889&text=Hi,%20There!" target="_blank" rel="noreferrer" >support@edneed.com</a>  if you'd want us to erase User Submitted Data that you have provided over the Application, and we will react in a fair amount of time. Please be aware that for the Application to operate effectively, some or all of the User Provided Data may be necessary.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Children
                </h3>
                <p className="text-xxs">
                  Since the program is intended for educational institutions like schools, children may install it with their parent's permission. Parents and guardians should email us at <a href="https://api.whatsapp.com/send?phone=918368214889&text=Hi,%20There!" target="_blank" rel="noreferrer" >support@edneed.com</a> if they learn that their child installed the program and gave us personal information without their permission. We shall promptly remove the Child's account and any associated data from our records.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Security
                </h3>
                <p className="text-xxs">
                  Your information's confidentiality is something we take seriously. To secure the information we process and keep, we offer physical, technological, and procedural protections. For instance, we only allow authorized personnel and contractors who require access to the information to run, develop, or enhance our Application. Please be advised that no security system can completely thwart possible security breaches, despite our best efforts to guarantee acceptable protection for the information we handle and keep.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Changes to this privacy policy

                </h3>
                <p className="text-xxs">
                  For whatever reason, this privacy statement may be modified from time to time. Any time we make changes to our privacy policy, we'll upload a new version on the App Store and send you a push notification through the application to let you know. You are urged to review this privacy statement frequently for updates since continuous usage will signify your agreement to all revisions.

                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Your Consent
                </h3>
                <p className="text-xxs">
                  You agree that we may treat your information as described in this Privacy Policy at the time of use and as we may modify it. "Processing" refers to utilizing cookies on a computer or mobile device or to using or handling data in any manner, including but not limited to gathering, storing, erasing, utilizing, combining, and disclosing data—activities that will all take place in India. Your information will be transmitted, processed, and kept in accordance with India’s privacy rules even if you live outside India.
                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Disclosure of Data

                </h3>
                <p className="text-xxs">
                  If the School App has a good faith opinion that disclosing your personal data is essential, it may do so.

                </p>
                <ol className="text-xxs nest-1">
                  <li>
                    to fulfill a legal requirement
                  </li>
                  <li>
                    To stop or look into potential misbehavior related to the Service
                  </li>
                  <li>
                    To ensure the public's or Service users' personal safety

                  </li>
                  <li>
                    to shield oneself from a legal obligation

                  </li>
                </ol>
              </li>
              <li>
                <h3 className="text-xs primary">
                  GDPR Compliance

                </h3>
                <p className="text-xxs">
                  This App complies with UK's and the European Commission’s GDPR guidelines and according to it:-

                </p>
                <p className="text-xxs">
                  “We may use your personal data to develop new services” (as it is unclear what the “services” are or how the data will help develop them)

                </p>
                <p className="text-xxs">
                  “We may use your personal data for research purposes”

                </p>
                <p className="text-xxs">
                  “We may use your personal data to offer personalized services”

                </p>
                <p className="text-xxs">
                  “We will retain your shopping history and use details of the products you have previously purchased to make suggestions to you for other products which we believe you will also be interested in”
                </p>
                <p className="text-xxs">
                  “We will retain and evaluate information on your recent visits to our website and how you move around different sections of our website for analytics purposes to understand how people use our website so that we can make it more intuitive”

                </p>
                <p className="text-xxs">
                  “We will keep a record of the articles on our website that you have clicked on and use that information to target advertising on this website to you that is relevant to your interests, which we have identified based on articles you have read”.

                </p>
              </li>
              <li>
                <h3 className="text-xs primary">
                  Contact Us

                </h3>
                <p className="text-xxs">
                  If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at <a href="https://api.whatsapp.com/send?phone=918368214889&text=Hi,%20There!" target="_blank" rel="noreferrer" >support@edneed.com</a>
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>

    </>
  )
}
