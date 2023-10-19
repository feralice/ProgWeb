const index = (req, res) => {
    res.send('Hello world');
}

const about = (req, res) => {
    res.send('Pagina about');
}

export default {index, about};