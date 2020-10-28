import React, {Component} from 'react';

class CandidateInfo extends Component {
	render() {
		const {candidate} = this.props;
		if (!candidate) {
			return <h2>No candidate selected yet</h2>
		}
		return (
			<div>
				<div>Name: {candidate.name}</div>
				<div>Email: {candidate.email}</div>
				<div>Age: {candidate.age}</div>
				<div><img src={candidate.picture} alt={candidate.name}/></div>
			</div>
		);
	}
}

export default CandidateInfo;
