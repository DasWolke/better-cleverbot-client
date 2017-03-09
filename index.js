/**
 * Created by Julian on 08.03.2017.
 */
let axios = require('axios');
let base_url = "https://cleverbot.io/1.0";
/**
 * Creates a new Cleverbot instance
 * @class
 */
class BetterCleverbotIo {
    /**
     * @param {string} key - The cleverbot.io api key
     * @param {string} user - The cleverbot.io user id
     * @param {string} [nick=better_cleverbot_io] - The session id, which should be used for this client.
     */
    constructor({key, user, nick}) {
        if (!key) throw new Error('You need to provide an Api Key!');
        if (!user) throw new Error('You need to provide a User!');
        this.key = key;
        this.user = user;
        this.nick = nick ? nick : 'better_cleverbot_io';
    }

    /**
     * Sets the session id
     * @param {string} nick - The session id to use
     */
    setNick(nick) {
        this.nick = nick;
    }

    /**
     * Create a new Session
     * @return {Promise}
     */
    create() {
        return new Promise((resolve, reject) => {
            axios.post(`${base_url}/create`, {user: this.user, key: this.key, nick: this.nick},{timeout:3000}).then(res => {
                if (res.data.status === 'success') {
                    resolve();
                }
                if (res.data.status === 'Error: reference name already exists') {
                    resolve();
                }
                reject({error: 'The api emitted an unknown response!', response: res.data.status});
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Same as create but with callbacks instead of promises
     * @param {function} cb - The callback function
     */
    createLegacy(cb) {
        this.create().then(() => {
            cb();
        }).catch(err => cb(err));
    }

    /**
     * Sends a question to the api
     * @param input - the input
     * @return {Promise}
     */
    ask(input) {
        return new Promise((resolve, reject) => {
            if (!input || input === '') {
                reject('You entered an empty input!');
            }
            axios.post(`${base_url}/ask`, {user: this.user, key: this.key, nick: this.nick,text:input},{timeout:3000}).then(res => {
                if (res.data.status === 'success') {
                    resolve(res.data.response);
                }
                reject({error: 'The api emitted an unknown response!', response: res.data.status});
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * Same as ask but with callbacks instead of promises
     * @param input - the input
     * @param cb - The callback function
     */
    askLegacy(input, cb) {
        this.ask(input).then((response) => {
            cb(null, response);
        }).catch(err => cb(err));
    }
}
module.exports = BetterCleverbotIo;
