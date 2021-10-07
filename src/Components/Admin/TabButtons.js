const TabButtons = ({ buttons, changeTab, activeTab }) => (
    <div className="tab-buttons">
      {buttons.map((button) => (
        <button
          className={button === activeTab ? "active" : ""}
          onClick={() => changeTab(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );

  export default TabButtons;