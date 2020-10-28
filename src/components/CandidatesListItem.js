import React, {Component} from 'react';

class CandidatesListItem extends Component {
	render() {
		const {onCandidateAccepted, onCandidateRejected} = this.props;
		const bgColor = this.props.selected ? "yellow" : "lightblue";
		const style = {
			backgroundColor: bgColor,
			color: "black",
			width: "400px",
			fontSize: "larger",
			padding: "10px",
			border: "1px solid black",
		}

		return (
			<div style={style}>
				<div style={{display: "inline"}} onClick={() => this.props.onCandidateSelected()}>
					{this.props.candidate.name}
				</div>
				{onCandidateAccepted && onCandidateRejected &&
				<div style={{display: "inline"}}>
					<button onClick={() => onCandidateAccepted()}>Accept</button>
					<button onClick={() => onCandidateRejected()}>Reject</button>
				</div>
				}
			</div>
		);
	}
}

export default CandidatesListItem;
