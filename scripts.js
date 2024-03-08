//--------------------------CRIAR CONTA----------------------

const criarConta= async(event)=>{
    event.preventDefault();//--tratamento para alterar o comprotamento padrão de apagar os dados

   try{
    // --------pegar com DOM
    const email = document.getElementById("email").Value;
    const nome =  document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

   //-------salvar numa variavel
    const data={
        email:email,
        nome :nome,
        senha:senha,
    };


    //-------------salvar no localstorage----
    localStorage.setItem("sendAccount", JSON.stringify(data));
    const dataSave = JSON.parse(localStorage.getItem("sendAccount"));

    const response = await api.post("signup", dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resSignup = document.getElementById("resSignup");

    localStorage.removeItem("sendAccount");
    resSignup.textContent = `a requisição fui bem sucedida ${response.data.message}`;
  } catch (error) {
    console.log(`Ocorreu um erro durante a requisição ${error.message}`);
    
  }
};


//-----------------------LOGIN-----------

const login= async(event)=>{
    event.preventDefault();

    try{
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const data={
            email: email,
            senha: senha,
        };

        localStorage.setItem("sendLogin", JSON.stringify(data));

    const dataSave = JSON.parse(localStorage.getItem("sendLogin"));

    const response = await api.post("login", dataSave);

    console.log(`a requisição fui bem sucedida ${response.data}`);

    const resLogin = document.getElementById("loginUser");
    resLogin.textContent = `a requisição fui bem sucedida ${response.data.message}`;

    localStorage.removeItem("loginUser");
    localStorage.setItem("userEmail", JSON.stringify(email));
  } catch (error) {
    console.log(`Ocorreu um erro!!!! ${error.message}`);
    window.alert("Ocorreu erro !!!");
  }
};

//---------------------------------adiconar o recado---------------------------------------
const addMsg = async (event) => {
    event.preventDefault();
  
    try {
      const email = document.getElementById("emailUser").value;
      const title = document.getElementById("title").value;
      const message = document.getElementById("message").value;
  
      const data = {
        email: email,
        title: title,
        description: message,
      };
      console.log(data)
  
      localStorage.setItem("Message", JSON.stringify(data));
  
      const dataSave = JSON.parse(localStorage.getItem("Message"));
  
      const response = await api.post(`Message/${email}`, dataSave);
  
      console.log(`a requisição fui bem sucedida ${response.data}`);
  
      const resMessage = document.getElementById("resMessage");
      resMessage.textContent = `a requisição fui bem sucedida ${response.data.message}`;
      localStorage.removeItem("sendMessage");
    } catch (error) {
      console.log(`Ocorreu um erro durante a requisição ${error.message}`);
      window.alert("Ocorreu um erro ao Tentar Adicionar a Mensagem !!!");


      
    }
  };
  
  ////////////////////////////////////////ATUALIZAR RECADO////////////////////////////////////////
  /*
    
Cria funcao async/await faz tratamento de erro try (deu) /catch (deu ruim)
Capturar dados e parametros 
Corpo req armazenar em uma variavel para fazer manipulacao
Insere no local storage os dados
Pega os dados que estao no local storage p/ trabalhar na requisao
faz a requicao dado instancia.metodo('caminho',parametro do corpo)
Trabalha a resposta com dom para renderizar na tela
Limpa o localstorage
*/


  const attMsg = async (event) => {
    event.preventDefault();
  
    try {
      const id = document.getElementById("id").value;
      const title = document.getElementById("newTitle").value;
      const message = document.getElementById("newMessage").value;
  
      const data = {
        title: title,
        description: message,
      };
  
      localStorage.setItem("newMessage", JSON.stringify(data));
  
      const dataSave = JSON.parse(localStorage.getItem("newMessage"));
  
      const response = await api.put(`Message/${id}`, dataSave);
  
      console.log(`a requisição fui bem sucedida ${response.data}`);
  
      const resAttMessage = document.getElementById("resAttMessage");
      resAttMessage.textContent = `a requisição fui bem sucedida ${response.data.message}`;
      localStorage.removeItem("newMessage");
    } catch (error) {
      console.log(`Ocorreu um erro durante a requisição ${error.message}`);
    }
  };
  ////////////////////////////////////////REMOVER RECADO//////////////////////////////////////////
  
  const remMsg = async (event) => {
    event.preventDefault();
  
    try {
      const id = document.getElementById("idRem").value;
  
      const data = {
        id: id,
      };
  
      localStorage.setItem("idRem", JSON.stringify(data));
  
      const dataSave = JSON.parse(localStorage.getItem("idRem"));
  
      const response = await api.delete(`userMessage/${id}`, dataSave);
  
      console.log(`a requisição fui bem sucedida ${response.data}`);
  
      const resDelMessage = document.getElementById("resDelMessage");
      resDelMessage.textContent = `a requisição fui bem sucedida ${response.data.message}`;
      localStorage.removeItem("idRem");
    } catch (error) {
      console.log(`Ocorreu um erro durante a requisição ${error.message}`);
    }
  };





//----------- ATUALIZAR MENSAGEM ------------

const atualizarMensagem = async (event) => {
    event.preventDefault()

    try {
        //Caminho feliz => oq faz quando o código dá certo 

        const id = document.getElementById("updateId").value
        const title = document.getElementById("updateTitle").value
        const description = document.getElementById("updateDescription" ).value
    
        const data ={
            title: title,
            description: description
        }
    
        localStorage.setItem('dadosAtualizados', JSON.stringify(data))
    
        const dataSaved = JSON.parse(localStorage.getItem('dadosAtualizados'))
    
    
        const response = await api.put(`massage/${id}`, dataSaved)
    
        const respostaElemento = document.getElementById("updateRequisicao")
    
        respostaElemento.textContent = `Requisição PUT realizada com sucesso ${response.data.message}`

        localStorage.removeItem('dadosAtualizados')

        console.log('Os dados foram apagados temporariamente')


    } catch (error) {
        //Caminho Triste => oq faz quando o código dá ruim
        console.log(`Erro durante a requisição : ${error.message}`)
    }
}

//----------- DELETAR  MENSAGEM ------------

const deletarMensagem = async(event) =>{
    event.preventDefault()

    try {
        const id = document.getElementById("apagarId").value

        const response = await  api.delete(`massage/${id}`)

        const respostaElemento = document.getElementById("deleteRequisicao")

        respostaElemento.innerText = `Mensagem deletada com sucesso ${response.message}`

       
    } catch (error) {
        console.log(error.message)
    }
   

}
