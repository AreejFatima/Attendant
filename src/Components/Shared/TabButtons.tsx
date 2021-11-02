interface Props {
  buttons: string[];
  changeTab: (button: string) => void;
  activeTab: string;
}

const TabButtons = (props: Props): JSX.Element => {
  const { buttons, changeTab, activeTab } = props;
  return (
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
};

export default TabButtons;
