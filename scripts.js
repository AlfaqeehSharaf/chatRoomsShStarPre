// الانتقال إلى صفحة الدردشة العامة
function startPublicChat() {
    window.location.href = 'room.html';
}

// إنشاء رابط غرفة خاصة
function createRoom() {
    const roomId = generateRoomId();
    window.location.href = `room.html?room=${roomId}`;
}

// توليد معرف غرفة عشوائي
function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
}

// جلب معرف الغرفة الحالي (إذا كان موجودًا)
function getRoomId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('room') || 'public';
}

// جلب الرسائل المخزنة من التخزين المحلي
function loadMessages() {
    const roomId = getRoomId();
    const messages = JSON.parse(localStorage.getItem(roomId)) || [];
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = messages.map(msg => `<div>${msg}</div>`).join('');
    chatBox.scrollTop = chatBox.scrollHeight;
}

// إرسال رسالة وتخزينها في التخزين المحلي
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const roomId = getRoomId();
        const messages = JSON.parse(localStorage.getItem(roomId)) || [];
        messages.push(message);
        localStorage.setItem(roomId, JSON.stringify(messages));
        messageInput.value = '';
        loadMessages();
    }
}

// تحميل الرسائل عند فتح الصفحة
if (document.getElementById('chat-box')) {
    loadMessages();
}
