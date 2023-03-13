import "./css/donation.css"

const Donation = () => {
  return(
    <div className="donation">
      <div className="donate-banner">
          <h1>DONATE</h1>
          <p>Support our cause!</p>
      </div>

      <div className="donate-button">
        <a
          href="https://makeawishca.donordrive.com/index.cfm?fuseaction=donorDrive.personalCampaign&participantID=23919"
          target="_blank"
        ><button>
          DONATE  
        </button></a>
      </div>

      <div className="spacer"></div>
    </div>
)};

export default Donation 