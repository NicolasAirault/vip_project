function refreshMetier(){
    if(document.getElementById('checkChanteur').checked){
        document.getElementById('block_chanteur').style.display = '';
    }else{
        document.getElementById('block_chanteur').style.display = 'none';
    }
    if(document.getElementById('checkActeur').checked){
        document.getElementById('block_acteur').style.display = '';
    }else{
        document.getElementById('block_acteur').style.display = 'none';
    }
    if(document.getElementById('checkCouturier').checked){
        document.getElementById('block_couturier').style.display = '';
    }else{
        document.getElementById('block_couturier').style.display = 'none';
    }
    if(document.getElementById('checkMannequin').checked){
        document.getElementById('block_mannequin').style.display = '';
    }else{
        document.getElementById('block_mannequin').style.display = 'none';
    }
    if(document.getElementById('checkRealisateur').checked){
        document.getElementById('block_realisateur').style.display = '';
    }else{
        document.getElementById('block_realisateur').style.display = 'none';
    }
}