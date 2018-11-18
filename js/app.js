'use strict';



function Horns(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];



Horns.prototype.render = function () {
  const source   = $('#horn-template').html();
  const template = Handlebars.compile(source);
  return template(this);
};

const fillSelect = () => {
  let selectMenuArray = ['Filter by Keyword'];
  Horns.allHorns.forEach((object) => {
    if (!selectMenuArray.includes(object.keyword)) {
      selectMenuArray.push(object.keyword);
    }
  });
  if ($('option').length <= 1 ) {
    selectMenuArray.forEach( (value) => {
      $('select').append(`<option value="${value}">${value}</option>`);
    })
  }
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
  Horns.sortHorns();
  Horns.allHorns.forEach(horn => $('#photo-template').append(horn.render()));
}

Horns.sortHorns = () => {
  $('div').remove();
  if($('#number-horns')[0].checked) {
    Horns.allHorns.sort((a,b) => a.horns - b.horns)
  } else if($('#title-horn')[0].checked){
    Horns.allHorns.sort((a,b) => {
      a = a.title.toUpperCase();
      b = b.title.toUpperCase();
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
}


$('#hornfilter').on('change', function () {
  let $selection = $(this).val();
  if ($selection === 'Filter by Keyword') {
    $('div').show();
  } else {
    $('div').hide();
    $(`.${$selection}`).show();
  }
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

$('#number-horns').on('change', function () {
  Horns.loadHorns();
});

$('#title-horn').change(function () {
  Horns.loadHorns();
});

function pageLoad() {
  $(() => Horns.readJson('data/page-1.json'));
}

pageLoad();



