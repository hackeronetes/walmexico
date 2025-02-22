export const LocalComerical:any =  {
    tradename: {
        id: 'tradename',
        placeholder: 'Ingrese',
        label: 'Nombre comercial',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar nombre comercial',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    companyName: {
        id: 'companyName',
        placeholder: 'Ingrese ',
        label: 'Nombre compañía',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar nombre de la compañía',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    firstNames: {
        id: 'firstNames',
        placeholder: 'Ingrese',
        label: 'Nombre(s)',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    lastName: {
        id: 'lastName',
        placeholder: 'Ingrese',
        label: 'Apellido Paterno',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar apellido paterno',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    motherLastName: {
        id: 'motherLastName',
        placeholder: 'Ingrese',
        label: 'Apellido Materno',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    phone: {
        id: 'phone',
        placeholder: 'Ingrese',
        label: 'Número de Celular',
        validation: {
            maxLength: {
                value: 50,
                message: '',
            },
            pattern: {
                value: /^[0-9]+$/,
                message: 'Debe ingresar números',
            },
        }
    },
    phoneNumber: {
        id: 'phoneNumber',
        placeholder: 'Ingrese',
        label: 'Teléfono',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar teléfono',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    email: {
        id: 'email',
        placeholder: 'ejemplo@empresa.com',
        label: 'Correo electrónico',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar correo electrónico',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
        }
    },
    emailConfirmation: {
        id: 'emailConfirmation',
        placeholder: 'ejemplo@empresa.com',
        label: 'Confirmación de correo',
        validation: {
            required: {
                value: true,
                message: 'Debe confirmar correo',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
            validate: ''
        }
    },


    /* Form 2 start here */

    ofData: {
        id: 'ofData',
        placeholder: 'Ingrese',
        label: 'M² Requeridos',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar los metros',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Debe ingresar números',
            // },
        }
    },
    toData: {
        id: 'toData',
        placeholder: 'Ingrese',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar los metros',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Debe ingresar números',
            // },
        }
    },
    turnOfTheCompany: {
        id: 'turnOfTheCompany',
        placeholder: 'Seleccione',
        label: 'Giro de la empresa',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar el giro de la empresa',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    turnOfTheCompanyEvent: {
        id: 'turnOfTheCompanyEvent',
        placeholder: 'Seleccione',
        label: 'Giro o Negocio',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar el giro de la empresa',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    twistDescription: {
        id: 'twistDescription',
        placeholder: 'Ingrese',
        label: 'Descripción del giro',
        validation: {
            required: {
                value: true,
                message: 'Ingrese la descripcion del giro',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    AdditionalDescription: {
        id: 'AdditionalDescription',
        placeholder: 'Ingrese',
        label: 'Descripción del giro',
        validation: {
            required: {
                value: true,
                message: 'Ingrese la descripcion del giro',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
            },
        }
    },
    specialRequirements: {
        id: 'specialRequirements',
        placeholder: 'Ingrese',
        label: 'Requerimientos Especiales',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar requerimientos especiales',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    image: {
        id: 'image',
        placeholder: '',
        label: 'Imagen',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },

        },
    },
    document: {
        id: 'document',
        placeholder: '0.00',
        label: 'Carga de documentos',
        multiple: true,
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    
        // validation: {
        //     required: {
        //         value: true,
        //         message: 'Debe seleccionar el(los) documento(s) adicional(es)',
        //     },
        //     maxLength: {
        //         value: 50,
        //         message: '50 characters max',
        //     },
        // }
    },
    documentAddtitonal: {
        id: 'document',
        placeholder: 'Documentos Adicionales',
        label: 'Documentos Adicionales',
        multiple: true,
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    interest: {
        id: 'interest',
        placeholder: 'SC PLAYA DEL CARMEN, L02',
        label: 'Tiendas de interés',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },

    /* Form 3  */

    isWalmartLocation: {
        id: 'isWalmartLocation',
        placeholder: '¿Es inquilino de un local de Walmart?',
        label: '¿Es inquilino de un local de Walmart?',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
        }
    },
    businessBackground: {
        id: 'businessBackground',
        placeholder: 'Antecedentes o experiencia comercial',
        label: 'Antecedentes o experiencia comercial',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    comment: {
        id: 'comment',
        placeholder: 'Ingrese',
        label: 'Comentarios',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    determinant: {
        id: 'determinant',
        placeholder: 'Determinante',
        label: 'Determinante',
    },
    unitName: {
        id: 'unitName',
        placeholder: 'Nombre de la unidad',
        label: 'Nombre de la unidad',
    },
    address: {
        id: 'address',
        placeholder: 'Dirección',
        label: 'Dirección',
    },
   
    rfc: {
        id: 'rfc',
        placeholder: 'RFC',
        label: 'RFC',
    },
   
    lineBusiness: {
        id: 'lineBusiness',
        placeholder: 'Line of Business',
        label: 'Giro o Negocio',
    },
    addressInterest: {
        id: 'addressInterest',
        placeholder: 'Direcciones de Interés',
        label: 'Direcciones de Interés',
    },
    excessDescription: {
        id: 'excessDescription',
        placeholder: 'Direcciones de InterésDescripción del uso que se le dará a la propiedad',
        label: 'Descripción del uso que se le dará a la propiedads',
    },


    status: {
        id: 'status',
        placeholder: 'Estatus',
        label: 'Estatus',
    },


    razonSocial: {
        id: 'razonSocial',
        placeholder: 'Razón Social',
        label: 'Razón Social',
    },
    profile: {
        id: 'profile',
        placeholder: 'Perfil',
        label: 'Perfil',
    },

    guy: {
        id: 'guy',
        placeholder: 'Tipo',
        label: 'Tipo',
    },
    state: {
        id: 'state',
        placeholder: 'Estado',
        label: 'Estado',
    },
    city: {
        id: 'city',
        placeholder: 'Ciudad',
        label: 'Ciudad',
    },
    street: {
        id: 'street',
        placeholder: 'Calle',
        label: 'Calle',
    },
    number: {
        id: 'number',
        placeholder: 'Número',
        label: 'Número',
    },
    colony: {
        id: 'colony',
        placeholder: 'Colonia',
        label: 'Colonia',
    },
    municipilaty: {
        id: 'municipilaty',
        placeholder: 'Delegación o Municipio',
        label: 'Delegación o Municipio',
    },
    zip: {
        id: 'zip',
        placeholder: 'Código Postal',
        label: 'Código Postal',
    },
    location: {
        id: 'location',
        placeholder: 'Ubicación',
        label: 'Ubicación',
    },
    betweenStreet: {
        id: 'betweenStreet',
        placeholder: 'Entre calles',
        label: 'Entre calles',
    },
    and: {
        id: 'and',
        placeholder: 'Y',
        label: 'Y',
    },
    surface: {
        id: 'surface',
        placeholder: 'Superficie',
        label: 'Superficie',
    },
    landUse: {
        id: 'landUse',
        placeholder: 'Uso del suelo',
        label: 'Uso del suelo',
    },
    description: {
        id: 'description',
        placeholder: 'Descripción',
        label: 'Descripción',
    },
     typeOperation: {
        id: 'typeOperation',
        placeholder: 'Tipo de operación',
        label: 'Tipo de operación',
    },
    price: {
        id: 'price',
        placeholder: 'Precio',
        label: 'Precio',
    },


    /*Supplier */ 

    corporateName: {
        id: 'corporateName',
        placeholder: 'Corporate Name',
        label: 'Corporate Name',
    },
    typePerson: {
        id: 'typePerson',
        placeholder: 'Tipo de Persona',
        label: 'Tipo de Persona',
    },
    contactName: {
        id: 'contactName',
        placeholder: 'Nombre del Contacto',
        label: 'Nombre del Contacto',
    },
    contactName2: {
        id: 'contactName',
        placeholder: 'Nombre Contacto',
        label: 'Nombre Contacto',
    },
    specialtyRequestedBuilder: {
        id: 'specialtyRequestedBuilder',
        placeholder: 'Especialidad Solicitada: Constructor de obra',
        label: 'Especialidad Solicitada: Constructor de obra',
    },
    
    specialtyRequestedSupervisor: {
        id: 'specialtyRequestedSupervisor',
        placeholder: 'Especialidad Solicitada: Supervisor de obra',
        label: 'Especialidad Solicitada: Supervisor de obra',
    },
    specialtyRequestedLaboratory: {
        id: 'specialtyRequestedLaboratory',
        placeholder: 'Especialidad Solicitada: Laboratorio',
        label: 'Especialidad Solicitada: Laboratorio',
    },
    specialtyRequestedDesigner: {
        id: 'specialtyRequestedDesigner',
        placeholder: 'Especialidad Solicitada: Proyectista',
        label: 'Especialidad Solicitada: Proyectista',
    },
    specialtyRequestedElectrical : {
        id: 'specialtyRequestedElectrical',
        placeholder: 'Especialidad Solicitada: Acometida electrica',
        label: 'Especialidad Solicitada: Acometida electrica',
    },
    specialtyRequestedSpecialist: {
        id: 'specialtyRequestedSpecialist',
        placeholder: 'Especialidad Solicitada: Especialista',
        label: 'Especialidad Solicitada: Especialista',
    },
    dateStart: {
        id: 'dateStart',
        placeholder: 'Fecha de Inicio de Operaciones',
        label: 'Fecha de Inicio de Operaciones',
    },
    surfaceArea: {
        id: 'surfaceArea',
        placeholder: 'Superficie de las instalaciones de su oficina (m2)',
        label: 'Superficie de las instalaciones de su oficina (m2)',
    },
    staffNo: {
        id: 'staffNo',
        placeholder: 'Número de personas que forman parte de su plantilla fija en oficina',
        label: 'Número de personas que forman parte de su plantilla fija en oficina',
    },
    experience: {
        id: 'experience',
        placeholder: 'Experiencia curricular',
        label: 'Experiencia curricular',
    },
    revnue: {
        id: 'revnue',
        placeholder: 'Ingresos Facturados en el año inmediato anterior',
        label: 'Ingresos Facturados en el año inmediato anterior',
    },
    annualReturn: {
        id: 'annualReturn',
        placeholder: 'Declaración anual del ejercicio inmediato anterior',
        label: 'Declaración anual del ejercicio inmediato anterior',
    },
    workingCapital: {
        id: 'workingCapital',
        placeholder: 'Capital de trabajo',
        label: 'Capital de trabajo',
    },
    capital: {
        id: 'capital',
        placeholder: 'Estados financieros base para el cálculo del capital de trabajo',
        label: 'Estados financieros base para el cálculo del capital de trabajo',
    },
    walmartRegistry: {
        id: 'walmartRegistry',
        placeholder: '¿Anteriormente formó parte del padrón de walmart?',
        label: '¿Anteriormente formó parte del padrón de walmart?',
    },
    workingWalmart: {
        id: 'workingWalmart',
        placeholder: '¿Cuenta con alguna filial trabajando para walmart de México?',
        label: '¿Cuenta con alguna filial trabajando para walmart de México?',
    },
    rankWalmart: {
        id: 'rankWalmart',
        placeholder: '¿Anteriormente alguna de sus filas formó parte del padrón de walmart?',
        label: '¿Anteriormente alguna de sus filas formó parte del padrón de walmart?',
    },
    specify: {
        id: 'specify',
        placeholder: 'Especifique',
        label: 'Especifique',
    },


    companyNameSupplier: {
        id: 'companyName',
        placeholder: 'Nombre de la Empresa',
        label: 'Nombre de la Empresa',
    },
    productName: {
        id: 'productName',
        placeholder: 'Nombre del Producto',
        label: 'Nombre del Producto',
    },
    manufacturer: {
        id: 'manufacturer',
        placeholder: '¿Fabricante o Distribuidor?',
        label: '¿Fabricante o Distribuidor?',
    },
    saleExclusivity: {
        id: 'saleExclusivity',
        placeholder: 'Exclusividad de Venta',
        label: 'Exclusividad de Venta',
    },
    coverLetter: {
        id: 'coverLetter',
        placeholder: 'Carta de Presentación',
        label: 'Carta de Presentación',
    },
    technical: {
        id: 'technical',
        placeholder: 'Especificaciones técnicas del producto',
        label: 'Especificaciones técnicas del producto',
    },

    dateStartEvent: {
        id: 'dateStartEvent',
        placeholder: 'Fecha Inicio',
        label: 'Fecha  Inicio',
    },
    dateEndEvent: {
        id: 'dateEndEvent',
        placeholder: 'Fecha Fin',
        label: 'Fecha  Fin',
    },
    eventDescription: {
        id: 'eventDescription',
        placeholder: 'Descripción del evento',
        label: 'Descripción del evento',
    },
    eventInterest: {
        id: 'eventInterest',
        placeholder: 'Sucursales de interés',
        label: 'Sucursales de interés',
    },



    
   
   
    
    
    
}



