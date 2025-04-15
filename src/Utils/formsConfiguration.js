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
          {id:'ambiente',name:'Ambiente', type:'select', value:'', required: true, 
            options:[{value:'Interno',name:'Interno'},{value:'Externo',name:'Externo'}]
          },
        
         
        ]
      },
      {
        formFields:[
        
         
         
          {id:'epocaFloracao', name:'Epoca de Floração', type:'select', value: "", required: true,
            options:[{value:'Inverno',name:'Inverno'},{value:'Verão',name:'Verão'},
              {value:'Outono',name:'Outono'},{value:'Primavera',name:'Primavera'}
            ]
          },
          
          {id: 'preco', name:'Preço', type:'number', value: "", required: true},
          {id: 'estoque', name:'Estoque', type:'number', value: "", required: true},
          {id:'frequenciaPoda', name:'Frequência de Poda', type:'select', value: "", required: true,  options:[{value:'Baixa',name:'Baixa'},{value:'Média',name:'Média'},
            {value:'Alta',name:'Alta'},
          ]},
        ]
      },
      {
        formFields:[
          {id:'necessidadeAgua', name:'Necessidade de Agua', type:'select', value: "", required: true,
            options:[{value:'Baixa',name:'Baixa'},{value:'Média',name:'Média'},
              {value:'Alta',name:'Alta'},
            ]
          },
          {id:'porte', name:'Porte', type:'select', value: "", required: true, options:[{value:'pequeno',name:'Pequeno'},{value:'Média',name:'Média'},
            {value:'grande',name:'Grande'}]},
          {id:'necessidadeLuz', name:'Necessidade de Luz', type:'select', value: "", required: true,  options:[{value:'Baixa',name:'Baixa'},{value:'Média',name:'Média'},
            {value:'Alta',name:'Alta'},
          ]},
          
          {id:'umidadeSolo', name:'Umidade de Solo', type:'select', value: "", required: true,  options:[{value:'Baixa',name:'Baixa'},{value:'Média',name:'Média'},
            {value:'Alta',name:'Alta'}]}
        ]
      },
      {
        formFields:[
          {id:'petFriendly', name:'Pet Friendly', type:'checkbox', value: false,},
          {id:'atraiAbelha', name:'Atrai Abelha', type:'checkbox', value:false},
          
        ]
      }
    ]
};
  
  export default entityForms;
  