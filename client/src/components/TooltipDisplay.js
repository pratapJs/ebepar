import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const TooltipDisplay = ({ children, tooltipName }) => {
	return (
		<OverlayTrigger
			key="top"
			placement="top"
			overlay={<Tooltip>{tooltipName}</Tooltip>}
		>
			{children}
		</OverlayTrigger>
	);
};

export default TooltipDisplay;
