'use strict';

const source   = document.getElementById('horn-template').innerHTML;
const template = Handlebars.compile(source);

function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];



Horns.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('.clone');

  let hornHTML = $('#photo-template').html();

  hornClone.html(hornHTML);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('img').attr('alt', this.description);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword);


};

const fillSelect = () => {
  let selectMenuArray = [];
  Horns.allHorns.forEach((object) => {
    if (!selectMenuArray.includes(object.keyword)) {
      selectMenuArray.push(object.keyword);
    }
  });
  if ($('option').length <= 1 ) {
    console.log('heyyyyyyyy');
    selectMenuArray.forEach( (value) => {
      $('select').append(`<option value="${value}">${value}</option>`);
    })
  }
  //Fills select menu
}


Horns.readJson = (filename) => {
  Horns.allHorns = [];
  $.get(filename, 'json').then(data => {
    data.forEach(obj => {
      Horns.allHorns.push(new Horns(obj));
    });
  }).then(Horns.loadHorns).then(fillSelect)
};

Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => horn.render());
  $('#photo-template').hide();
}

$('#hornfilter').on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`.${$selection}`).show();
});

$('#one').on('click', function () {
  console.log('one clicked');
  $('div').remove();
  $('option').remove();
  $(() => Horns.readJson('data/page-1.json'));
});

$('#two').on('click', function () {
  console.log('two clicked');
  $('div').remove();
  $('option').remove();
  $(() => Horns.readJson('data/page-2.json'));

});

function pageLoad() {
$(() => Horns.readJson('data/page-1.json'));
  // $(() => Horns.readJson('data/page-2.json'));
}

pageLoad();



