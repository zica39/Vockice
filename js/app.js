const uplatna_skala = [200,100,40,20,10,6,4,3,2];
const skala_dobitaka_niz = [1000,750,500,400,300,250,200,150,100];
const skala_dobitaka_vece_manje = [0,2,3,4,6,10,15,20,30,40,60,100,200];
const bodovna_tabela = [300,120,60,60,60,40,40,20,20,20]; 

var primarni_slot = new Array(3);

var slot0 = new Array(8);
var slot1 = new Array(8);
var slot3 = new Array(8);

const slot0_div = document.getElementById('slot0');
const slot1_div = document.getElementById('slot1');
const slot2_div = document.getElementById('slot2');

const slot0_dobitak = document.getElementById('slot0_dobitak');
const slot1_dobitak = document.getElementById('slot1_dobitak');
const slot2_dobitak = document.getElementById('slot2_dobitak');

const dobitni_mod1 = document.getElementById('dobitni_mod1');
const dobitni_mod2 = document.getElementById('dobitni_mod3');
const dobitni_mod3 = document.getElementById('dobitni_mod2');

var dobitak = 0;
var dobitak_u_kreditima = 0;
var kredit = 100;
var ulog = 1;
var ulozeno = false;
var bonus_ulog = false;
var dodatni_ulog = false;
var resetuj_slotove = false;
var broj = 0;
var dobitni_mod = 0;

const besplatni_ulog = new Audio('./data/sounds/besplatni_ulog.mp3');	
const bez_dobitaka_zvuk = new Audio('./data/sounds/bez_dobitka.mp3');	
const dobitak_zvuk = new Audio('./data/sounds/dobitak.mp3');	
const ode_voz = new Audio('./data/sounds/ode_voz.mp3');	
const placeni_ulog = new Audio('./data/sounds/placeni_ulog.mp3');	
const punjenje_slota = new Audio('./data/sounds/punjenje_slota.mp3');	
const ulog_zvuk = new Audio('./data/sounds/ulog.mp3');	
const veca_manja = new Audio('./data/sounds/veca_manja.mp3');	
const slot_ugasen = new Audio('./data/sounds/slot_ugasen.mp3');	
const devet_istih = new Audio('./data/sounds/devet_istih.mp3');	
const promjena_uloga = new Audio('./data/sounds/promjena_uloga.mp3');	
const podignut_novac = new Audio('./data/sounds/podignut_novac.mp3');	

const zvukovi = [besplatni_ulog,bez_dobitaka_zvuk,dobitak_zvuk,ode_voz,placeni_ulog,punjenje_slota,ulog_zvuk,veca_manja, slot_ugasen, devet_istih, promjena_uloga,podignut_novac];
var trenutni_zvuk = null;

var interval = null;
var intervalFlag = false;

const MAKSIMALAN_ULOG = 10;
const MINIMALNI_ULOG = 1;
const prazna_vocka = './data/vocke/empty.png';

const skala_dobitaka = document.getElementById('skala_dobitaka');
const smanji_ulog_dugme = document.getElementById('smanji_ulog');
const povecaj_ulog_dugme = document.getElementById('povecaj_ulog');
const ulozi_dugme = document.getElementById('ulozi');
const primarni_slot_div = document.getElementById('primarni_slot');
const game_over =  document.getElementById('game_over');
const dobitak_div = document.getElementById('dobitak_div');

const vece_manje_modal = document.getElementById('vece_manje_modal');
const dobitak_u_kreditima_div = document.getElementById('dobitak_u_kreditima');
const lista_dobitaka = document.getElementById('skala_za_dobitke');
const broj_div = document.getElementById('broj');

const skala_brojeva = document.getElementById('skala_brojeva');
const veca_div = document.getElementById('veca');
const manja_div = document.getElementById('manja');
const vece_manje_slot = document.getElementById('vece_manje_slot');

const zvuk = document.getElementById('zvuk');

pocni_igru();

function pocni_igru(){
	
	pripremi_slotove();
	
	bodovna_tabela.reverse();
	
	primarni_slot.fill(-1);
	slot0.fill(-1);
	slot1.fill(-1);
	slot1.fill(-1);
	
	slot0_div.br_kolona = 0;
	slot1_div.br_kolona = 0;
	slot2_div.br_kolona = 0;
	
	slot0_div.poeni = 0;
	slot1_div.poeni = 0;
	slot2_div.poeni = 0;
	
	slot0_div.onclick = popuni_slot;
	slot1_div.onclick = popuni_slot;
	slot2_div.onclick = popuni_slot;
	
	slot0_div.dobitak_div = slot0_dobitak;
	slot1_div.dobitak_div = slot1_dobitak;
	slot2_div.dobitak_div = slot2_dobitak;
	
	azuriraj_skalu_dobitka();
	azuriraj_panel_stanja();
	
	smanji_ulog_dugme.onclick = smanji_ulog;
	povecaj_ulog_dugme.onclick = povecaj_ulog;
	ulozi_dugme.onclick = ulozi;
	dobitak_u_kreditima_div.onclick = isplati_dobitak;
	
	veca_div.onclick = veca;
	manja_div.onclick = manja;
	
	zvuk.onclick = iskljuci_zvuk;
	
	document.onkeydown = function(e){
		var key = e.key.toLowerCase();
		
		if(key == 'a')smanji_ulog_dugme.click();
		if(key == 's')povecaj_ulog_dugme.click();
		
		if(key == ' ' || key == 'l'){
			
			if(dobitak_u_kreditima == 0){
				if((ulozi_dugme.innerHTML == 'Stake' || ulozi_dugme.innerHTML == 'Replace slot for free') && !ulozi_dugme.classList.contains('invisible'))
					ulozi_dugme.click();
			
			}
			else dobitak_u_kreditima_div.click();	
		}
		
		if(key == 'b')if(ulozi_dugme.innerHTML == 'Replace costs 1x Stake' && !ulozi_dugme.classList.contains('invisible'))ulozi_dugme.click();
		
		if(key == 'x')slot0_div.click();
		if(key == 'c')slot1_div.click();
		if(key == 'v')slot2_div.click();
		
		if(key == 'm')veca_div.click();
		if(key == 'n')manja_div.click();
		
		
	
	}
}
function azuriraj_skalu_dobitka(){
	
	var tabela = skala_dobitaka.lastElementChild.firstElementChild;
	var uplatna_skala_kopija = uplatna_skala.slice();
	
	for(var i = 1; i<= tabela.children.length-1;i++){	
		tabela.children[i].lastElementChild.innerHTML = uplatna_skala_kopija.shift()*ulog;
	}
}

function azuriraj_panel_stanja(){
	document.forms['stanje']['kredit'].value = kredit;
	document.forms['stanje']['ulog'].value = ulog;
	
}

function smanji_ulog(){
	if(ulozeno)return;
	
	if(ulog > MINIMALNI_ULOG){
		ulog--;
		playSound(promjena_uloga);
		
			if(ulog == MINIMALNI_ULOG){
				smanji_ulog_dugme.setAttribute('disabled','');
			}
			
		povecaj_ulog_dugme.removeAttribute('disabled');
			
	}
	
	 azuriraj_panel_stanja();
	 azuriraj_skalu_dobitka();
	 azuriraj_skalu_dobitka();
}

function povecaj_ulog(){
	if(ulozeno)return;
	
	if(ulog < MAKSIMALAN_ULOG){
		ulog++;
		playSound(promjena_uloga);
		
		if(ulog == MAKSIMALAN_ULOG){
				povecaj_ulog_dugme.setAttribute('disabled','');
		}
		
		smanji_ulog_dugme.removeAttribute('disabled');

	}
	
	 azuriraj_panel_stanja();
	 azuriraj_skalu_dobitka();
	 azuriraj_skalu_dobitka();
}

function ulozi(){
	if(!bonus_ulog && !dodatni_ulog){
		
		if(kredit >= ulog){
			if(resetuj_slotove){
				resetuj_slotove = false;
				resetuj();
			}
			kredit -= ulog;
			ulozeno = true;
			ispuni_primarni_slot();
			animacija_treptanja();
			azuriraj_panel_stanja();
			playSound(ulog_zvuk);
			bonus_ulog = true;
			this.innerHTML = 'Replace slot for free';
			
		}
	}else if(bonus_ulog){		
			ispuni_primarni_slot();
			animacija_treptanja();
			playSound(besplatni_ulog);
			bonus_ulog = false;
			dodatni_ulog = true;
			this.innerHTML = 'Replace costs 1x Stake';
	}else{
		if(kredit>= ulog){
			kredit -= ulog;
			ispuni_primarni_slot();
			animacija_treptanja();
			playSound(placeni_ulog);
			azuriraj_panel_stanja();
			bonus_ulog = false;
			
			this.innerHTML = 'Stake';
			this.classList.add('invisible');
		}
	}
}

function ispuni_primarni_slot(){
	primarni_slot.forEach((e,i,arr) => {
		primarni_slot[i] = daj_nasmumirni_broj();
		primarni_slot_div.children[i].firstChild.setAttribute('src',`./data/vocke/${primarni_slot[i]}.png`);
	});	
}

function isprazni_primarni_slot(){
	primarni_slot.fill(-1);
	primarni_slot.forEach((e,i,arr) => {
		primarni_slot_div.children[i].firstChild.setAttribute('src', prazna_vocka);
	});	
}

function daj_nasmumirni_broj(min=0, max = 10){
	
	return  Math.floor(Math.random()*max + min);
}

function isprazni_slotove(){
	var slots = [slot0_div.children,slot1_div.children,slot2_div.children]
	
	var img = document.createElement('img');
	img.style.border = '1px solid black';
	img.setAttribute('src',prazna_vocka);
	img.setAttribute('draggable','false');
	
	
	for(var a in slots){
		for(var b in slots[a]){
			for(var i = 0; i<3; i++){
				if(slots[a][b].appendChild)
				slots[a][b].children[i].setAttribute('src',prazna_vocka);
			}
		}
	}
}


function pripremi_slotove(){
	var slots = [slot0_div.children,slot1_div.children,slot2_div.children]
	
	var img = document.createElement('img');
	//img.style.border = '1px solid black';
	img.setAttribute('src',prazna_vocka);
	img.setAttribute('draggable','false');
	img.classList.add('img-fluid');
	
	
	for(var a in slots){
		for(var b in slots[a]){
			for(var i = 0; i<3; i++){
				if(slots[a][b].appendChild)
				slots[a][b].appendChild(img.cloneNode());
			}
		}
	}
}

function popuni_slot(e){
	
	if(!ulozeno) return;
	
	if(this.br_kolona <= 2){
		this.br_kolona ++;
		this.children[this.br_kolona-1].children[0].setAttribute( 'src',  `./data/vocke/${primarni_slot[0]}.png`);
		this.children[this.br_kolona-1].children[1].setAttribute( 'src',  `./data/vocke/${primarni_slot[1]}.png`);
		this.children[this.br_kolona-1].children[2].setAttribute( 'src',  `./data/vocke/${primarni_slot[2]}.png`);
		
		this.children[this.br_kolona-1].children[0].e = primarni_slot[0];
		this.children[this.br_kolona-1].children[1].e = primarni_slot[1];
		this.children[this.br_kolona-1].children[2].e = primarni_slot[2];
		
		ispuni_primarni_slot();
		animacija_treptanja();
		playSound(punjenje_slota);
		
		if(this.br_kolona == 3){
			izracunaj_poene(this);
			testiraj_pobedu();
		}
		
		
	}
	
}

function animacija_treptanja(){
	slots_div.querySelectorAll('img').forEach((ex) => ex.classList.remove('animacija'));
	
	var ps = primarni_slot;
	
	for(var i = 0; i<= 2 ;i++){
		
		var e = slots_div.children[i];
		
		if(e.br_kolona == 1){
			
			var e0 = e.children[0].children;
			
			if(e0[0].e == ps[0])
				e0[0].classList.add('animacija');
			if(e0[1].e == ps[1])
				e0[1].classList.add('animacija');
			if(e0[2].e == ps[2])
				e0[2].classList.add('animacija');
			// unakrsno
			if(e0[0].e == ps[1])
				e0[0].classList.add('animacija');
			if(e0[2].e == ps[1])
				e0[2].classList.add('animacija');
		}

		if(e.br_kolona == 2){
			var e0 = e.children[0].children;
			var e1 = e.children[1].children;
			
			if(e0[0].e == ps[0] && e1[0].e == ps[0]){
				e0[0].classList.add('animacija');
				e1[0].classList.add('animacija');
			}
			if(e0[1].e == ps[1] && e1[1].e == ps[1]){
				e0[1].classList.add('animacija');
				e1[1].classList.add('animacija');
			}
			if(e0[2].e == ps[2] && e1[2].e == ps[2]){
				e0[2].classList.add('animacija');
				e1[2].classList.add('animacija');
			}
			
			if(e0[0].e == e1[1].e && e1[1].e == ps[2]){
				e0[0].classList.add('animacija');
				e1[1].classList.add('animacija');
			}
			
			if(e0[2].e == e1[1].e && e1[1].e == ps[0]){
				e0[2].classList.add('animacija');
				e1[1].classList.add('animacija');
			}
		}	
	}	
}

function izracunaj_poene(el){
	var poeni = 0;
	var e = el.children;
	var e0 = e[0].children;
	var e1 = e[1].children;
	var e2 = e[2].children;
	
	if(e0[0].e == e1[0].e && e1[0].e == e2[0].e)poeni+=bodovna_tabela[e0[0].e];
	if(e0[1].e == e1[1].e && e1[1].e == e2[1].e)poeni+=bodovna_tabela[e0[1].e];
	if(e0[2].e == e1[2].e && e1[2].e == e2[2].e)poeni+=bodovna_tabela[e0[2].e];
	
	if(e0[0].e == e1[1].e && e1[1].e == e2[2].e)poeni+=bodovna_tabela[e0[0].e];
	if(e0[2].e == e1[1].e && e1[1].e == e2[0].e)poeni+=bodovna_tabela[e0[2].e];
	
	var arr = [e0[0].e , e0[1].e , e0[2].e , e1[0].e , e1[1].e , e1[2].e , e2[0].e , e2[1].e , e2[2].e]
	if( arr.every( (val, i, a) => val === a[0] )){
	//animacija za svi isti
	poeni += 300;
	playSound(devet_istih);
	}
	
	//console.log(poeni);
	el.poeni = poeni;
	
	el.dobitak_div.firstElementChild.innerHTML = poeni;
	el.dobitak_div.classList.remove('invisible');
	
}

function testiraj_pobedu(){
	
	//animacije
	
	if(slot0_div.br_kolona == 3 && slot1_div.br_kolona == 3 && slot2_div.br_kolona == 3){
		
		ulozi_dugme.classList.add('invisible');
		
		if(slot0_div.poeni)dobitni_mod++;
		if(slot1_div.poeni)dobitni_mod++;
		if(slot2_div.poeni)dobitni_mod++;
	
		dobitak = slot0_div.poeni + slot1_div.poeni + slot2_div.poeni;
		var cisti_dobitak = dobitak;
		
		if(dobitni_mod == 2) dobitak =dobitak + dobitak*0.5;
		if(dobitni_mod == 3) dobitak = dobitak*2;
		
		//animacija_rezultata
		dobitak_div.classList.remove('d-none');
		document.forms['stanje']['dobitak'].value = cisti_dobitak;
	
		//console.log(dobitak);
	
		if(dobitak>= 100){
			////otvaranje modala za kockanje
			playSound(dobitak_zvuk);
			
			var us = uplatna_skala.slice();
			us.forEach((e,i,arr) => {arr[i] = e * ulog})
			
			var closest = skala_dobitaka_niz.reduce(function(prev, curr) {
				return (Math.abs(curr - dobitak) < Math.abs(prev - dobitak) ? curr : prev);
			});
			
			dobitak_u_kreditima = us[skala_dobitaka_niz.indexOf(closest)];
			
			
			skala_dobitaka_vece_manje.slice().reverse().forEach((e,i)=>{
				skala_za_dobitke.children[i].innerHTML = e*ulog;
			});
			
			if(dobitak_u_kreditima >= skala_dobitaka_vece_manje[skala_dobitaka_vece_manje.length-1]){
					dobitak_u_kreditima_div.value = dobitak_u_kreditima;
					ugasen_slot();
			}
			
			
		}else if(dobitak<100 && dobitni_mod>1){
			bez_dobitka();
			playSound(dobitak_zvuk);
		}
		else{
			//animacija rezultata
			bez_dobitka();		
			playSound(bez_dobitaka_zvuk);		
		}
		return true;
	}
		return false;
	
}

function bez_dobitka(){
	
	isprazni_primarni_slot();
	game_over.style.display = 'block';
	
	ulozeno = false;
	bonus_ulog = false;
	dodatni_ulog = false;
	resetuj_slotove = true;
	
	ulozi_dugme.innerHTML = 'Stake';
	ulozi_dugme.classList.remove('invisible');
}

function sa_dobitkom(){
	isprazni_primarni_slot();
	
	ulozeno = false;
	bonus_ulog = false;
	dodatni_ulog = false;
	
	dobitak = 0;
	dobitak_u_kreditima = 0;
	
	ulozi_dugme.innerHTML = 'Stake';
	ulozi_dugme.classList.remove('invisible');
	
}

function resetuj(){
	isprazni_slotove();
	
	dobitni_mod = 0;
	
	slot0_div.br_kolona = 0;
	slot1_div.br_kolona = 0;
	slot2_div.br_kolona = 0;
	
	slot0_div.poeni = 0;
	slot1_div.poeni = 0;
	slot2_div.poeni = 0;
	
	slot0_div.dobitak_div.firstElementChild.innerHTML = 0;
	slot1_div.dobitak_div.firstElementChild.innerHTML = 0;
	slot2_div.dobitak_div.firstElementChild.innerHTML = 0;
	
	slot0_div.dobitak_div.classList.add('invisible');
	slot1_div.dobitak_div.classList.add('invisible');
	slot2_div.dobitak_div.classList.add('invisible');
	
	game_over.style.display = 'none';
	dobitak_div.classList.add('d-none');
}

function otvori_vece_manje_modal(){
	vece_manje_modal.click();
	
	dobitak_u_kreditima_div.value = dobitak_u_kreditima;
		
	broj = daj_nasmumirni_broj(1,13);
	broj_div.innerHTML = broj;
	obiljezi_broj(broj);
	pokreni_animaciju();
	
}

function manja(){
	if(broj == 1)return;
	var stari_broj = broj;
	broj = daj_nasmumirni_broj(1,13);
	
	obiljezi_broj(broj);
	
	if(broj<stari_broj){
		veci_el = vrati_veci_dobitak();
		
		dobitak_u_kreditima_div.value = Number(veci_el.innerHTML);
		dobitak_u_kreditima =  Number(veci_el.innerHTML);
		
		if(dobitak_u_kreditima == lista_dobitaka.firstElementChild.innerHTML){
			ugasen_slot();
			return;
		}
		playSound(veca_manja);
		
	}else{
		//prokockao_pobedu();
		dobitak_u_kreditima_div.value = 0;
		zaustavi_animaciju();
		lista_dobitaka.lastElementChild.classList.add('text-danger');
		playSound(ode_voz);
	}
	
}

function veca(){
	if(broj == 13)return;
	var stari_broj = broj;
	broj = daj_nasmumirni_broj(1,13);
	
	obiljezi_broj(broj);
	
	if(broj>stari_broj){
		veci_el = vrati_veci_dobitak();
		
		dobitak_u_kreditima_div.value = Number(veci_el.innerHTML);
		dobitak_u_kreditima =  Number(veci_el.innerHTML);
		
		if(dobitak_u_kreditima == lista_dobitaka.firstElementChild.innerHTML){
			ugasen_slot();
			return;
		}
		playSound(veca_manja);
	}else{
		//prokockao_pobedu();
		dobitak_u_kreditima_div.value = 0;
		zaustavi_animaciju();
		lista_dobitaka.lastElementChild.classList.add('text-danger');
		playSound(ode_voz);
	}
	
}
function ugasen_slot(){
	//zvuk
	dobitak_u_kreditima_div.click();
	playSound(slot_ugasen);
	
	
}

function vrati_veci_dobitak(){
	var val = dobitak_u_kreditima_div.value;
	
	
	for(var i in lista_dobitaka.children)
		if(lista_dobitaka.children[i].innerHTML == val){
			return lista_dobitaka.children[i-1];
		}
	
}

function obiljezi_broj(broj){
	for(var i in skala_brojeva.children)
		if(skala_brojeva.children[i].classList){
			skala_brojeva.children[i].classList.remove('bg-danger');
			if(skala_brojeva.children[i].innerHTML == broj)
			skala_brojeva.children[i].classList.add('bg-danger');
		}
	broj_div.innerHTML = broj;
}

function isplati_dobitak(){
	dobitak_u_kreditima = Number(dobitak_u_kreditima_div.value);
	kredit += dobitak_u_kreditima;
	if(dobitak_u_kreditima>0)
		playSound(podignut_novac);
	azuriraj_panel_stanja();
	zaustavi_animaciju()
	
	sa_dobitkom();
	resetuj();
	document.getElementById('zatvori_modal').click();
}

function pokreni_animaciju(){
	interval = setInterval(()=>{
		var veci = vrati_veci_dobitak();
		
		if(veci.nextElementSibling)
		var trenutni = veci.nextElementSibling;
		var prvi = lista_dobitaka.lastElementChild;
		
		lista_dobitaka.querySelectorAll('.text-danger').forEach((e)=> e.classList.remove('text-danger'));
		
		if(intervalFlag){
			prvi.classList.add('text-danger');
			veci.classList.add('text-danger');
			
			
		}else{
			trenutni.classList.add('text-danger');
		}
		
		var pozadina = intervalFlag?'veca.png':'manja.png';
		vece_manje_slot.style.backgroundImage = `url(./data/${pozadina})`;
			
		intervalFlag = !intervalFlag;
	},500);
	
}
function zaustavi_animaciju(){
	
	clearInterval(interval);
	lista_dobitaka.querySelectorAll('.text-danger').forEach((e)=> e.classList.remove('text-danger'));
}

function playSound(snd){
	
	if(trenutni_zvuk){
		trenutni_zvuk.currentTime = 0;
		trenutni_zvuk.pause();
		
		if(trenutni_zvuk == devet_istih )
				dobitni_mod1.classList.remove('animacija');
		if(trenutni_zvuk == dobitak_zvuk && dobitak<100 )
				dobitni_mod2.classList.remove('animacija');
	}
	snd.currentTime = 0;
	setTimeout(function(){snd.play();},0);
	
	trenutni_zvuk = snd;
}

devet_istih.onplay = function(e){
	dobitni_mod1.classList.add('animacija');
}

devet_istih.onended = function(e){
	dobitni_mod1.classList.remove('animacija');
}

dobitak_zvuk.onplay = function(e){
	if(dobitni_mod == 2)
	dobitni_mod2.classList.add('animacija');
	
	if(dobitni_mod == 3)
	dobitni_mod3.classList.add('animacija');
}

dobitak_zvuk.onended = function(e){
	if(dobitni_mod == 2)
	dobitni_mod2.classList.remove('animacija');
	
	if(dobitni_mod == 3)
	dobitni_mod3.classList.remove('animacija');
	
	document.forms['stanje']['dobitak'].value = dobitak;
	
	if(dobitak>100)
	setTimeout(otvori_vece_manje_modal,1000);
	
	//else
	//bez_dobitka();
	//otvori_vece_manje_modal();
}

ode_voz.onended = function(e){
	
	isplati_dobitak();
};

function iskljuci_zvuk(e){
	if(!this.iskljuci){
		for(var i in zvukovi)
			zvukovi[i].muted = true;
			this.innerHTML = '🔇';
	}else{
		for(var i in zvukovi)
			zvukovi[i].muted = false;
			this.innerHTML = '🔊';
	}
	this.iskljuci = !this.iskljuci;
}