/**
 * Created by Barthap on 15.03.2017.
 */
//const main = require('/logic');

//jQuery plugin for double tap
(function($){

    $.event.special.doubletap = {
        bindType: 'touchend',
        delegateType: 'touchend',

        handle: function(event) {
            var handleObj   = event.handleObj,
                targetData  = jQuery.data(event.target),
                now         = new Date().getTime(),
                delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
                delay       = delay == null ? 300 : delay;

            if (delta < delay && delta > 30) {
                targetData.lastTouch = null;
                event.type = handleObj.origType;
                ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
                    event[property] = event.originalEvent.changedTouches[0][property];
                })

                // let jQuery handle the triggering of "doubletap" event handlers
                handleObj.handler.apply(this, arguments);
            } else {
                targetData.lastTouch = now;
            }
        }
    };

})(jQuery);

//currently edited position index
let currentId = null;


//helper funcs for HTML generation
function insertLiContent(name, val)
{
    htm = '<span id="listName">'+name+'</span>';
    if(val > 0) htm += '<span class="badge"><span id="listValue">'+val+'</span>zł</span>';
    return htm;
}
function addPersonView(name, val, id)
{
    htm = '<li class="list-group-item" id="person-'+id+'">';
    htm += insertLiContent(name, val.toFixed(2));
    htm += '</li>';
    $('#listaOsob').append(htm);
}
//Adding Person Helper
function AddPerson(name, val)
{
    val = (val == '' ? 0 : val);
    per = new Person(name,parseFloat(val))
    People.Add(per);
}


//EVENT FUNCTIONS
const events = {
    //adds new person
    fnAdd: function () {
        AddPerson($('input[name="imie"]').val(), $('input[name="ile"]').val() );

        Update();

        $('div.form-group').children('input').val('');
    },
    //saves changes made in dialog
    fnEdit: function () {
        val = $('#how-much').val();
        val = (val == '' ? 0 : val);

        newName = $('#recipient-name').val();

        People.Update(currentId, newName, parseFloat(val));

        Update();

        $('#editModal').modal('hide');
    },
    //deletes active list item
    fnDelete: function () {
        $('#edit-buttons').slideUp();
        $('#listaOsob').remove('li.active');
        People.Delete(currentId);
        currentId = null;
        Update();

        $('#editModal').modal('hide');
    },
    //clears all list items
    fnClear: function () {
        People.list = [];
        People.list.length = 0;

        Update();
    },
    //sets clicked list position to active
    fnListClick: function () {
        currentId = parseInt($(this).prop('id').split('-')[1]);

        $('#listaOsob').children('li').removeClass('active');
        $(this).addClass('active');

        $('#edit-buttons').slideDown();
    },
    //opens edit dialog
    fnOpenEditModal: function (event = null) {

        if(currentId===null)return;

        per = People.Get(currentId);

        $('#how-much').val(per.how_much_paid.toFixed(2));
        $('#recipient-name').val(per.name);
        $('#editModal').modal();
    },
};

//Events helper function
function AddListEvents()
{
    //register events
    $('#listaOsob').children('li').click(events.fnListClick);
    $('#listaOsob').children('li').dblclick(events.fnOpenEditModal);
    $('#listaOsob').children('li').on('doubletap', events.fnOpenEditModal);
    $('button#edytuj').click(events.fnOpenEditModal);
}


//Builds UL people list view
function RebuildList()
{
    //clear previous list
    $('#listaOsob').children().remove();
    $('#result-table').children().remove();

    //add elements (not using forEach() because we need iterator index)
    for(let i = 0; i < People.list.length; i++)
    {
        let p = People.list[i];
        addPersonView(p.name, p.how_much_paid, i);
    }

    //add events for elements
    AddListEvents();
}

//calculate and show results
function ShowResults()
{
    var dh = {
        giveDelegate:		function(name, amount) {
            return  "<p class='text-danger'>" + name + " ma dać ogólnie " + amount.toFixed(2) + " zł</p>";
        },
        receiveDelegate:	function(name, amount) {
            return  "<p class='text-success'>" + name + " ma dostać ogólnie " + amount.toFixed(2) + " zł</p>";
        },
        tradeDelegate:		function(from, to, amount) {
            $('#result-table').append('<tr><td>'+from+'</td><td>'+to+'</td><td>'+amount.toFixed(2)+'zł</td></tr>');

            return  from + " ma odddac " + amount.toFixed(2) + " zl dla " + to + "<br>";
        },
    };

    var res = People.Calculate(dh);

    $('#results').html(res.ResultText);
    $('#ppl-count').html(res.PersonCount);
    $('#total').html(res.Sum.toFixed(2)+'zł');
    $('#ratio').html(res.SumPerOs+'zł');
}

//do everything needed to update page view
function Update() {
    RebuildList();
    ShowResults();
}

//example startup data
let exampleData =
    [
        new Person("Ania"),
        new Person("Basia", 15),
        new Person("Celina", 10.55),
        new Person("Dorota"),
        new Person("Ewa", 19.99),
    ];


//////////////////////////
//Global function called when page is loaded
$(function(){

    //first add example data
   People.Add(exampleData);

   //then update page view
    Update();

    //no list position is active so hide action buttons
    $('#edit-buttons').hide();

    //register events
    $('button#dodajBtn').click(events.fnAdd);
    $('button#save-edit').click(events.fnEdit);
    $('button#delete').click(events.fnDelete);
    $('button#usun').click(events.fnDelete);
    $('button#btnClear').click(events.fnClear);

});