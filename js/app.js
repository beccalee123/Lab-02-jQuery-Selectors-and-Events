'use strict';

function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];


let selectMenuArray = [];


Horns.prototype.render = function() {
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

  //Fills select menu

  if (!selectMenuArray.includes(this.keyword)) {
    selectMenuArray.push(this.keyword);
  }
};

const fillSelect = () => {
  selectMenuArray.forEach((value) => {
    $('select').append(`<option value="${value}">${value}</option>`);
  });
}


Horns.readJson = () => {
  $.get('data/page-1.json', 'json').then(data => {
    data.forEach(obj => {
      Horns.allHorns.push(new Horns(obj));
    });
  }).then(Horns.loadHorns);
};



Horns.loadHorns = () => {
  Horns.allHorns.forEach( horn => horn.render() );
  fillSelect();
}

$( () => Horns.readJson() );

// Select menu handling/filtering

$('#hornfilter').on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`.${$selection}`).show();
});
