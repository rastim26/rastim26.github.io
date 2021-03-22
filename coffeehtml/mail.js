var hide = 0; // 1 - прятать форму после отправки (0 - не прятать)
var delay = 3000; // задержка исчезновения сообщения в миллисекундах (0 - не скрывать)
var redirect = ''; // страница, на котороую перейти после отправки (оставить пустым чтоб никуда не переходить)
var recaptcha_site_key = ''; // ключ сайта для Recaptcha
var success_msg = "Ваше сообщение отправлено!"; // сообщение об успешной отправке
var error_msg = "Ошибка отправки! Попробуйте позже."; // сообщение об ошибке
var wait_msg = 'Идет отправка...'; // сообщение об отправке (оставить пустым чтоб не показывать)
var action = $('[src $= mail\\.js]').attr('src').replace('js','php'); // путь к скрипту отправки почты

var selector = 'form', form_ids = [], cur_id = '', success_original = false;
$(selector).each(function(indx){
  if($(this).attr('action') === undefined){
    $(this).attr('action', '/').attr('method', 'post');
    cur_id = $(this).attr('id');
    if( cur_id === undefined ) {
      cur_id = 'form_id_'+form_ids.length;
      $(this).attr('id', cur_id);
    }else if(form_ids.indexOf(cur_id) !== -1){
  		cur_id = cur_id+'_'+form_ids.length;
  		$(this).attr('id', cur_id);
  	}
  	form_ids.push(cur_id);
    $(this).find('.g-recaptcha').attr('data-sitekey', recaptcha_site_key);
  }
});

$(function(){
  $(selector+'[action = "/"]').submit(function(e) {

    cur_id = '#'+$(this).attr('id');
    if($(cur_id).attr('data-hide') !== undefined){ hide = parseInt($(cur_id).attr('data-hide')); }
    if($(cur_id).attr('data-hide-lbox') !== undefined){ hide_lbox = $(cur_id).attr('data-hide-lbox'); } else { hide_lbox = ''; }
    if($(cur_id).attr('data-delay') !== undefined){ delay = parseInt($(cur_id).attr('data-delay')); }
    cur_success = $(cur_id).siblings('.w-form-done').text().trim();
    if(cur_success !== 'Thank you! Your submission has been received!'){ success_msg = cur_success; success_original = true; }
    cur_error = $(cur_id).siblings('.w-form-fail').text().trim();
    if(cur_error !== 'Oops! Something went wrong while submitting the form'){ error_msg = cur_error; }
    cur_wait = $(cur_id).find('[data-wait]').attr('data-wait'); if(cur_wait !== 'Please wait...'){ wait_msg = cur_wait; }
    cur_redirect = $(cur_id).attr('data-redirect'); if(cur_redirect !== undefined){ redirect = cur_redirect; }
    cur_action = $(cur_id).attr('action'); if(cur_action !== '/'){ action = cur_action; }
    submit_div = $(cur_id).find('[type = submit]');
    submit_txt = submit_div.attr('value');
    if(wait_msg !== ''){ submit_div.attr('value', wait_msg); }
    if($(cur_id).attr('data-send') !== undefined){ $('<input type="hidden" name="sendto" value="'+$(cur_id).attr('data-send')+'">').prependTo(cur_id); }
    $('<input type="hidden" name="Форма" value="'+$(cur_id).attr('data-name')+'">').prependTo(cur_id);
    $('<input type="hidden" name="Страница" value="'+document.location.href+'">').prependTo(cur_id);
    $('<input type="hidden" name="required_fields">').prependTo(cur_id);
    required_fields = '';
    $(cur_id).find('[required=required]').each(function(){
      required_fields = required_fields + ',' + $(this).attr('name');
    });
    $(cur_id).find('[name=required_fields]').val(required_fields);
    e.preventDefault();
    var formData = new FormData($(cur_id)[0]);
    $.ajax({
      url: action,
      type: 'POST',
      processData: false,
      contentType: false,
      data: formData
    })
    .done(function( result ) {
      if(result == 'success'){
        if(redirect !== '' && redirect !== '/-') { document.location.href = redirect; return(true); }
        $(cur_id).siblings('.w-form-fail').hide();
        replay_class = '.w-form-done';
        replay_msg = success_msg;
      } else {
        $(cur_id).siblings('.w-form-done').hide();
        result === 'ERROR_REQUIRED' ? replay_msg = 'Не заполнено обязательное поле!' : replay_msg = error_msg;
        result === 'ERROR_RECAPTCHA' ? replay_msg = 'Подтвердите, что вы не робот!' : replay_msg = error_msg;
        replay_class = '.w-form-fail';
      }
      replay_div = $(cur_id).siblings(replay_class);
      if( !success_original ) replay_div.find('div').text(replay_msg);
      replay_div.show();
      if(hide){$(cur_id).hide();}
      if(hide_lbox !== ''){
        $('.'+hide_lbox).delay(delay).fadeOut();
        replay_div.delay(delay+1000).fadeOut();
        $(cur_id).delay(delay+1000).fadeIn();
      }
      submit_div.attr('value', submit_txt);
      if(delay !== 0) { replay_div.delay(delay).fadeOut(); }
      if(result == 'success'){
        $(cur_id).trigger("reset");
        $(cur_id).find('div[for]').hide();
      }
  });
  });
  $('textarea').val('');
});

$('.w-form [data-name]').each(function(indx){$(this).attr('name', $(this).attr('data-name'));});

$('label[for^=file]').each(function() {
  file_id = $(this).attr('for');
  $(this).after('<input name="file[]" type="file" id="' + file_id + '" multiple style="display:none;">');
  $(this).siblings('div[for]').each(function(){
    $(this).hide();
    $(this).attr('data-pattern', $(this).text());
  });
  $('input#' + file_id).change(function() {
    file_name = $(this).val().replace('C:\\fakepath\\', "");
    file_text = $(this).siblings('div[for]').attr('data-pattern').replace('%file%', file_name);
    if(file_text.trim() === '') file_text = 'Файл прикреплен.';
    $(this).siblings('div[for]').text(file_text).show();
  });
});
