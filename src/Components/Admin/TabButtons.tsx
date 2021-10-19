interface Props {
  buttons: string[];
  changeTab: (button: string) => void;
  activeTab: string;
}

const TabButtons = ({ buttons, changeTab, activeTab }: Props): JSX.Element => (
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
