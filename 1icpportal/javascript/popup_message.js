export default function(title, message){
    return `
    <div class="popup-message">
        <div class="content">
            <div class="title">
                <h3>${title}</h3>
            </div>
            <div class="message">
                <p>${message}</p>
            </div>
            <button id="ok" type="button">Ok</button>
        </div>
    </div>
    `;
}