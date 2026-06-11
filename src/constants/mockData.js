export const MOCK_MENUS = [
  { id: 1, name: "Conta 1", subMenus: [{ id: 11, name: "Caixa de entrada" }, { id: 12, name: "Caixa de saída" }] },
  { id: 2, name: "Conta 2", subMenus: [{ id: 22, name: "Inbox" }] },
  { id: 3, name: "Conta 3", subMenus: [{ id: 33, name: "Entrada" }, { id: 34, name: "Vip" }, { id: 35, name: "Lixo" }] },
];

export const MOCK_ITEMS = {
  11: [
    { id: 1, name: "José Ronaldo",    subject: "Boa tarde, como vai você?",               owner: "JR", users: ["MK","AB","LP"], date: "10:32",  read: false, starred: true  },
    { id: 2, name: "Maria Clara",     subject: "Reunião amanhã às 9h - confirmar presença", owner: "MC", users: ["TF","GS"],      date: "09:15",  read: true,  starred: false },
    { id: 3, name: "Paulo Salave'a",  subject: "Proposta comercial revisada",              owner: "PS", users: ["KA","RN","BF"], date: "Ontem",  read: false, starred: false },
    { id: 4, name: "Ana Beatriz",     subject: "Follow-up: projeto de interface",          owner: "AB", users: ["JR","MC"],      date: "Ontem",  read: true,  starred: true  },
    { id: 5, name: "Carlos Eduardo",  subject: "Documentação do sistema atualizada",       owner: "CE", users: ["PS","AB","LP"], date: "Seg",    read: false, starred: false },
  ],
  12: [
    { id: 6, name: "Fernanda Lima",   subject: "NF enviada para aprovação",               owner: "FL", users: ["RA","GM"],      date: "11:44",  read: false, starred: false },
    { id: 7, name: "Roberto Alves",   subject: "Contrato de prestação de serviços",       owner: "RA", users: ["FL"],           date: "08:22",  read: true,  starred: true  },
  ],
  22: [
    { id: 8,  name: "Sophie Turner",  subject: "New project kickoff meeting invite",      owner: "ST", users: ["JD","KL","MN"], date: "14:05",  read: false, starred: true  },
    { id: 9,  name: "James Decker",   subject: "Q2 budget review - action required",      owner: "JD", users: ["ST","KL"],      date: "Yesterday", read: true, starred: false },
    { id: 10, name: "Karen Liu",      subject: "Onboarding materials updated",            owner: "KL", users: ["ST"],           date: "Mon",    read: false, starred: false },
  ],
  33: [
    { id: 11, name: "Diego Martínez", subject: "Pedido urgente - responder hoje",         owner: "DM", users: ["LP","RB"],      date: "09:58",  read: false, starred: false },
  ],
  34: [
    { id: 12, name: "Luciana Pereira",subject: "Convite VIP para evento corporativo",     owner: "LP", users: ["DM","AB"],      date: "16:30",  read: true,  starred: true  },
    { id: 13, name: "Gustavo Santos", subject: "Oportunidade de parceria estratégica",    owner: "GS", users: ["LP"],           date: "Qui",    read: false, starred: false },
  ],
  35: [
    { id: 14, name: "Spam Bot",       subject: "Você ganhou R$50.000! Clique aqui",       owner: "SB", users: [],               date: "Qua",    read: true,  starred: false },
    { id: 15, name: "Newsletter",     subject: "Novidades do mês de Junho",               owner: "NL", users: [],               date: "Ter",    read: true,  starred: false },
  ],
};

