export default (text = "Moo") => {
    const element = document.createElement("div");
    const p = document.createElement('p');

    p.innerHTML = text;
    element.appendChild(p);
    element.className = "pure-button"

    console.log('lol') 

    return element;
};

