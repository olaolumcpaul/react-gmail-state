import React, { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";
import "./styles/App.css";

function App() {
  // Set up state using useState hook
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("Inbox");

  // Function to toggle the read property of an email
  const toggleRead = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  // Function to toggle the starred property of an email
  const toggleStar = (targetEmail) => {
    const updatedEmails = emails.map((email) =>
      email.id === targetEmail.id
        ? { ...email, starred: !email.starred }
        : email
    );
    setEmails(updatedEmails);
  };

  // Function to filter emails based on the hideRead and currentTab state
  const getFilteredEmails = () => {
    let filteredEmails = emails;
    if (hideRead) {
      filteredEmails = filteredEmails.filter((email) => !email.read);
    }
    if (currentTab === "Starred") {
      filteredEmails = filteredEmails.filter((email) => email.starred);
    }
    return filteredEmails;
  };

  // Get filtered emails based on current state
  const filteredEmails = getFilteredEmails();

  // Calculate counts for unread inbox emails and starred emails
  const inboxCount = emails.filter((email) => !email.read).length;
  const starredCount = emails.filter((email) => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "Inbox" ? "active" : ""}`}
            onClick={() => setCurrentTab("Inbox")}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCount}</span>
          </li>
          <li
            className={`item ${currentTab === "Starred" ? "active" : ""}`}
            onClick={() => setCurrentTab("Starred")}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => setHideRead(!hideRead)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              className={`email ${email.read ? "read" : "unread"}`}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
