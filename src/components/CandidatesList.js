import React, {Component} from 'react';
import CandidatesListItem from "./CandidatesListItem";

class CandidatesList extends Component {
	render() {
		const {candidates, selectedCandidate} = this.props;
		if (candidates.length === 0) {
			return (<h1>No candidates found</h1>);
		}
		const items = candidates.map(c =>
			<CandidatesListItem key={c.id} candidate={c} selected={c.id === selectedCandidate.id}
								onCandidateSelected={() => this.props.handleCandidateSelected(c.id)}
								onCandidateAccepted={() => this.props.handleCandidateAccepted(c.id)}
								onCandidateRejected={() => this.props.handleCandidateRejected(c.id)}/>)
		return (
			<div>{items}</div>
		);
	}
}

export default CandidatesList;
