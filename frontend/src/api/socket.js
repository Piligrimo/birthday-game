
import { useStore } from '../store'
export const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
        type: 'auth',
        token: localStorage.getItem('token')
    }));
});

socket.addEventListener('message', (event) => {
    const store = useStore()
    console.log('Message from server', event.data);
    const data = JSON.parse(event.data)
    if(data.type === 'chips') {
        store.notifyRecieveChips(data.giver.name, data.sum)
    }
});


export const receiveLikeListener = (cb) => {
    console.log('receiveLikeListener');
    
    socket.addEventListener('message', (event) => {
        const store = useStore()
        console.log('Message from server', event.data);
        const data = JSON.parse(event.data)
        if(data.type === 'like') {
            cb(data.name)
        }
    });
}