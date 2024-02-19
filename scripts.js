

const key = "37df693b04df8efdf698a37053dd365d" 


window.onload = carregarPagina;

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML ="Atual: " + Math.floor(dados.main.temp) + "Cº"
    document.querySelector(".max").innerHTML ="Máx: " + Math.floor(dados.main.temp_max) + "Cº"
    document.querySelector(".min").innerHTML ="Mín: " + Math.floor(dados.main.temp_min) + "Cº"
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".icone").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`

    console.log(dados);

}


async function buscarCidade(cidade) {

    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    cidade + 
    "&appid=" + 
    key + 
    "&lang=pt_br" +
    "&units=metric"
    )
    .then(resposta => resposta.json())
    colocarDadosNaTela(dados)

}


async function buscarCidadePorCoordenadas(latitude, longitude) {
    let dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`
    ).then((resposta) => resposta.json());
    colocarDadosNaTela(dados);
}

function obterLocalizacaoDoUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;
                buscarCidadePorCoordenadas(latitude, longitude);
            },
            (erro) => {
                console.error("Erro ao obter a localização:", erro.message);
            }
        );
    } else {
        console.error("Geolocalização não é suportada neste navegador");
    }
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value
    buscarCidade(cidade);
}

function carregarPagina() {
    obterLocalizacaoDoUsuario();
}


