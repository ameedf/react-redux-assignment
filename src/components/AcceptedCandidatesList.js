import React, {Component} from 'react';
import CandidatesListItem from "./CandidatesListItem";

class AcceptedCandidatesList extends Component {
	render() {
		const {candidates} = this.props;
		if (candidates.length === 0) {
			return (<h1>No accepted candidates yest</h1>);
		}
		const items = candidates.map(c =>
			<CandidatesListItem key={c.id} candidate={c} selected={false}/>)
		return (
			<div>{items}</div>
		);
	}
}

export default AcceptedCandidatesList;
