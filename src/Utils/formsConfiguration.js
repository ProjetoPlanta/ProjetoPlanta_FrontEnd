const entityForms = {   
    formLogin:[
      {
        formFields: [
          {id:'login', name:'Login', type:'email', value: "", required: true},
        ]
      },
      {
        formFields: [
          {id:'senha', name:'Senha', type:'password', value: "", required: true},
        ]
      },
    ],
    formCadastroPlanta:[
      {
        formFields:[
          {id:'nomeCientifico', name:'Nome Cientifico', type:'text', value: "", required: true},
          {id:'nomePopular', name:'Nome Popular', type:'text', value: "", required: true},
        ]
      },
      {
        formFields:[
          {id:'descricao', name:'Descrição', type:'description', value: "", required: true},
        ]
      },
      {
        formFields:[
          {id:'comoCuidar', name:'Como Cuidar', type:'description', value: "" , required: true},
        ],
      },
      {
        formFields:[
          {id:'ambiente',name:'ambiente', type:'select', value:'', required: true, 
            options:[{value:'interno',name:'Interno'},{value:'externo',name:'Externo'}]
          },
        
          {
            id:'categoriaGeral', 
            name:'Categoria Geral', 
            type:'select', value :"" , required: true,
            options:[{value:'Briofita',name:'Briofita'},{value:'pteridofita',name:'Pteridofita'},
              {value:'Gimnosperma',name:'Gimnosperma'},{value:'Angiosperma',name:'Angiosperma'}
            ]
          },
         
        ]
      },
      {
        formFields:[
        
         
         
          {id:'epocaFloracao', name:'Epoca de Floração', type:'select', value: "", required: true,
            options:[{value:'inverno',name:'Inverno'},{value:'verão',name:'verão'},
              {value:'outono',name:'Outono'},{value:'primavera',name:'Primavera'}
            ]
          },
          {id: 'preco', name:'Preço', type:'number', value: "", required: true},
          {id:'necessidadePoda', name:'Necessidade de Poda', type:'select', value: "", required: true,  options:[{value:'baixa',name:'Baixa'},{value:'media',name:'Média'},
            {value:'alta',name:'Alta'},
          ]},
        ]
      },
      {
        formFields:[
          {id:'necessidadeAgua', name:'Necessidade de Agua', type:'select', value: "", required: true,
            options:[{value:'baixa',name:'Baixa'},{value:'media',name:'Média'},
              {value:'alta',name:'Alta'},
            ]
          },
          {id:'porte', name:'Porte', type:'select', value: "", required: true, options:[{value:'pequeno',name:'Pequeno'},{value:'media',name:'Média'},
            {value:'grande',name:'Grande'}]},
          {id:'necessidadeLuz', name:'Necessidade de Luz', type:'select', value: "", required: true,  options:[{value:'baixa',name:'Baixa'},{value:'media',name:'Média'},
            {value:'alta',name:'Alta'},
          ]},
          
          {id:'umidadeSolo', name:'Umidade de Solo', type:'select', value: "", required: true,  options:[{value:'baixa',name:'Baixa'},{value:'media',name:'Média'},
            {value:'alta',name:'Alta'}]}
        ]
      },
      {
        formFields:[
          {id:'toxicidade', name:'Pet Friendly', type:'checkbox', value: false,},
          {id:'medicinal', name:'Medicinal', type:'checkbox', value: false},
          {id:'atraiAbelha', name:'Atrai Abelha', type:'checkbox', value:false},
          
        ]
      }
    ]
};
  
  export default entityForms;
  