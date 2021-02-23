import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
	env: "react-7g8aw28zdd8bc18f",
});
const auth = app.auth();

class Cloudbase {
	constructor() {
		this.auth = auth;
		this.db = app.database();
	}
	// API AUTH
	doSignInWithEmailAndPassword(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	doSignUpWithEmailAndPassword(email, password) {
		return this.auth.signUpWithEmailAndPassword(email, password);
	}

	doSignOut() {
		this.auth.signOut();
	}

	doUpdateUserName(name) {
		console.log(this.auth.currentUser);
		this.auth
			.isUsernameRegistered(name)
			.then((registered) => {
				if (!registered) {
					this.auth.currentUser.updateUsername(name).catch((err) => {
						console.log(err);
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	doUpdateUserInfo(state) {
		return this.auth.currentUser.update(state);
	}
}


export default Cloudbase;