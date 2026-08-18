import HeaderComponent from "../../components/header/Header.component";

const profileSummary = [
  { label: "Profile Type", value: "Business Banking" },
  { label: "Status", value: "Verified" },
  { label: "Branch", value: "Kathmandu Main Branch" },
  { label: "Member Since", value: "January 2023" },
];

const profileSecurity = [
  { title: "2FA", value: "Enabled" },
  { title: "Last Password Update", value: "12 Aug 2026" },
  { title: "Recent Login", value: "18 Aug 2026, 07:41 AM" },
];

const recentActivities = [
  "Updated contact phone number",
  "Changed transaction alert preference",
  "Added secondary email for statements",
];

const BankProfilePage = () => {
  return (
    <div className="bank-profile-page">
      <div className="header-section">
        <HeaderComponent />
      </div>
      <main className="bank-profile-main">
        <div className="wrapper">
          <section className="bank-profile-hero">
            <h1>Bank Profile</h1>
            <p>Manage your banking account profile and security settings.</p>
          </section>

          <section className="bank-profile-grid">
            <article className="bank-profile-card bank-profile-account">
              <h2>Account Information</h2>
              <div className="bank-profile-account__details">
                <div>
                  <span className="label">Account Holder</span>
                  <p>Nabaraj Rai</p>
                </div>
                <div>
                  <span className="label">Account Number</span>
                  <p>•••• •••• •••• 1985</p>
                </div>
                <div>
                  <span className="label">Primary Email</span>
                  <p>nabaraj@example.com</p>
                </div>
                <div>
                  <span className="label">Phone Number</span>
                  <p>+977 9812345678</p>
                </div>
              </div>
            </article>

            <article className="bank-profile-card">
              <h2>Profile Summary</h2>
              <ul className="bank-profile-list">
                {profileSummary.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="bank-profile-card">
              <h2>Security Overview</h2>
              <ul className="bank-profile-list">
                {profileSecurity.map((item) => (
                  <li key={item.title}>
                    <span>{item.title}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </article>

            <article className="bank-profile-card">
              <h2>Recent Activities</h2>
              <ul className="bank-profile-activity-list">
                {recentActivities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BankProfilePage;
