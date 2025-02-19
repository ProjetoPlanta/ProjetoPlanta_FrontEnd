const entityForms = {   
    formCadastroPlanta:{
    formFields:[
      {id:'nomeCientifico', name:'Nome Cientifico', type:'text', value: "", required: true},
      {id:'nomePopular', name:'Nome Popular', type:'text', value: "", required: true},
      {id:'ambiente',name:'ambiente', type:'text', value:'', required: true},
      {id:'atraiAbelha', name:'Atrai Abelha', type:'checkbox', value:false},
      {id:'categoriaGeral', name:'Categoria Geral', type:'select', value :"" , required: true, options:[{value:'teste',name:'testando'},{value:'teste2',name:'testando2'}]},
      {id:'cicloVida', name:'Ciclo de vida', type:'text', value: "" , required: true},
      {id:'descricao', name:'Descrição', type:'description', value: "", required: true},
      {id:'epocaFloracao', name:'Epoca de Floração', type:'text', value: "", required: true},
      {id:'imagem', name:'Imagem', type:'text', value: "", required: true},
      {id:'medicinal', name:'Medicinal', type:'checkbox', value: false},
      {id:'necessidadeAgua', name:'Necessidade de Agua', type:'text', value: "", required: true},
      {id:'necessidadeLuz', name:'Necessidade de Luz', type:'text', value: "", required: true},
      {id:'necessidadePoda', name:'Necessidade de Poda', type:'text', value: "", required: true},
      {id:'porte', name:'Porte', type:'text', value: "", required: true},
      {id: 'preco', name:'Preço', type:'number', value: "", required: true},
      {id:'toxicidade', name:'Toxidade', type:'checkbox', value: false,},
      {id:'umidadeSolo', name:'Umidade de Solo', type:'text', value: "", required: true}
    ]
    }

};
  
  export default entityForms;
  