import React, {Component} from 'react';
import CandidatesList from "./CandidatesList";
import CandidateInfo from "./CandidateInfo";
import AcceptedCandidatesList from "./AcceptedCandidatesList";
import logo from '../logo.svg';

class CandidatesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candidates: [],
			selectedCandidate: null,
			acceptedCandidates: [],
			isLoading: true,
		}
	}

	componentDidMount() {
		for (let i = 0; i < 10; i++) {
			setTimeout(() => this.loadNextCandidate(), 50);
		}
	}

	async loadNextCandidate() {
		try {
			this.setState({isLoading: true})
			const httpResponse = await fetch("https://randomuser.me/api/?results=1");
			const resultsObject = await httpResponse.json();
			const userInfo = resultsObject.results[0];
			const newCandidate = this.convertToCandidate(userInfo);
			const candidates = this.state.candidates;
			if (candidates.length === 0) {
				this.setState({selectedCandidate: newCandidate});
			}
			this.setState({
				candidates: [...candidates, newCandidate],
				isLoading: false,
			});
		} catch (err) {
			console.log(err);
		}
	}

	handleCandidateSelected(selectedId) {
		const selectedCandidate = this.state.candidates.find(c => c.id === selectedId);
		this.setState({selectedCandidate});
	}

	handleCandidateAccepted(acceptedId) {
		const {candidates, acceptedCandidates} = this.state;
		const acceptedCandidate = candidates.find(c => c.id === acceptedId);
		const newCandidates = candidates.filter(c => c.id !== acceptedId);
		const newAcceptedCandidates = [...acceptedCandidates, acceptedCandidate];
		this.setState({candidates: newCandidates, acceptedCandidates: newAcceptedCandidates});
		this.loadNextCandidate();
	}

	handleCandidateRejected(rejectedId) {
		this.setState({candidates: this.state.candidates.filter(c => c.id !== rejectedId)});
		this.loadNextCandidate();
	}

	convertToCandidate(userInfo) {
		const name = `${userInfo.name.title} ${userInfo.name.first} ${userInfo.name.last}`;
		return {
			name,
			id: userInfo.login.uuid,
			email: userInfo.email,
			age: userInfo.dob.age,
			picture: userInfo.picture.large,
		};
	}

	render() {
		const {candidates, acceptedCandidates, selectedCandidate} = this.state;
		return (
			<div>
				<table>
					<tbody>
					<tr>
						<td>
							<CandidatesList candidates={candidates}
											selectedCandidate={selectedCandidate}
											handleCandidateSelected={(id) => this.handleCandidateSelected(id)}
											handleCandidateAccepted={(id) => this.handleCandidateAccepted(id)}
											handleCandidateRejected={(id) => this.handleCandidateRejected(id)}/>
						</td>
						<td>
							<div>
								{this.state.isLoading &&
								<div><img src={logo} alt="Loading..." className="App-logo"/></div>
								}
								<CandidateInfo candidate={selectedCandidate}/>
							</div>
						</td>
						<td><AcceptedCandidatesList candidates={acceptedCandidates}/></td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default CandidatesPage;
