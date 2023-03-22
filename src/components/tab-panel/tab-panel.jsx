const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={'flex-grow-1'}
            {...other}
        >
            {value === index && (
                <div className="h-100">
                    {children}
                </div>
            )}
        </div>
    );
}

export default TabPanel;