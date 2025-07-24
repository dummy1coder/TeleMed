import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "../api/axios";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true,
  wsHost: window.location.hostname,
  wsPort: 6001,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios.post('/broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name,
        })
        .then(response => callback(false, response.data))
        .catch(error => callback(true, error));
      }
    };
  }
});

export default echo;
