(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{7280:function(e,t,n){Promise.resolve().then(n.bind(n,3488))},6463:function(e,t,n){"use strict";var r=n(1169);n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}})},3488:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(7437);n(2265);var i=n(9735),a=n(9962),u=n(2126),s=n(5969),o=n(8770),c=n(6463);function l(){let e=(0,c.useRouter)(),t=async t=>{let{username:n,email:r,password:i}=t;if(!n||!r||!i){(0,u.QT)("Faut remplir les champs, dozo.");return}if(!r.includes("@")){(0,u.QT)("Le mec ne sait pas \xe9crire un email.");return}if(i.length<8){(0,u.Eo)("Le mot de passe doit contenir au moins 8 caract\xe8res.");return}try{await (0,a.a$)(r,i,n),e.push("/account-validation")}catch(e){if(e.code&&(0,s.a)(e.code)){let t=(0,s.a)(e.code);(0,u.Eo)(t)}else(0,u.Eo)("Une erreur inconnue s'est produite.")}};return(0,r.jsx)(o.Z,{children:(0,r.jsx)(i.Z,{title:"Bienvenue!",subtitle:"Inscris-toi pour commencer",fields:[{id:"username",label:"Pseudo",type:"text"},{id:"email",label:"Email",type:"text"},{id:"password",label:"Mot de passe",type:"password"}],buttonText:"S'inscrire",linkText:"Se connecter",linkHref:"/",linkDescription:"D\xe9j\xe0 un compte ?",onSubmit:t})})}},5969:function(e,t,n){"use strict";n.d(t,{a:function(){return r}});let r=e=>{switch(e){case"auth/provider-already-linked":return"Ce compte est d\xe9j\xe0 li\xe9 \xe0 cet utilisateur.";case"auth/invalid-credential":return"Identifiants incorrects.";case"auth/credential-already-in-use":return"Ce compte existe d\xe9j\xe0 ou est d\xe9j\xe0 li\xe9.";case"auth/email-already-in-use":return"Ce compte existe d\xe9j\xe0.";case"auth/operation-not-allowed":return"Le provider n'est pas activ\xe9.";case"auth/invalid-email":return"Email invalide.";case"auth/wrong-password":return"Mot de passe incorrect.";case"auth/invalid-verification-code":return"Code de v\xe9rification incorrect.";case"auth/invalid-verification-id":return"Impossible de vous authentifi\xe9, r\xe9essayez dans quelques secondes.";case"auth/invalid-phone-number":return"Num\xe9ro de t\xe9l\xe9phone incorrect.";case"auth/too-many-requests":return"Nous avons d\xe9tect\xe9 une activit\xe9 inhabituelle et avons bloqu\xe9 momentan\xe9ment votre requ\xeate, r\xe9essayez dans quelques minutes.";default:return"Erreur inconnue"}}}},function(e){e.O(0,[358,691,697,93,971,23,744],function(){return e(e.s=7280)}),_N_E=e.O()}]);