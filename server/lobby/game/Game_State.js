function GameState () {
	let prototype = {
		phase: 'Draw phase',
		turnPlayer: 1,

		changePhase(phase) {
			this.phase = phase;
		},
		nextTurn(player) {
			this.turnPlayer = player;
		},
		newMessage(msg) {
			let date = new Date();
			let message = msg;
			message.date = `${date.getHours()}:${date.getMinutes()}`
			this.chat.push(message);
		},
		getUserIndex(user) {
			for (let [player, index] of this.players.entries()) {
				if (player.nickname === user.nickname) {
					return {list: this.players, index: index};
					break;
				}
			}
			for (let [spectator, index] of this.spectators.entries()) {
				if (spectator.nickname === user.nickname) {
					return {list: this.spectators, index: index};
					break;
				}
			}
			return false;
		},
		joinGame(user) {
			if (user.role == 'spectator') {
				this.spectators.push(user);
			} else {
				this.players.push(user);
			}
		},
		leaveGame(user) {
			let info = this.getUserIndex(user);
			if (info) {
				this[info.list].splice(info.index, 1);
			}
		},
		coinFlip() {
			if (Math.floor(Math.random() * 100) >= 50) {
				return true;
			} else {
				return false;
			}
		},
	};

	return Object.create(prototype);
}

module.exports = GameState;