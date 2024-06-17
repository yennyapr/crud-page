$(document).ready(function() {
    // Fetch all items when the page loads
    $.get('/items', function(data) {
        data.forEach(function(item) {
            addItemToTable(item);
        });
    });

    // Handle form submission
    $('#item-form').submit(function(e) {
        e.preventDefault();

        // get form data
        var id = $('#item-id').val();
        var name = $('#item-name').val();

        if (id) {
            // echo name value
            console.log(name);
            // Update existing item
            $.ajax({
                url: '/items/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ name: name }),
                success: function(data) {
                    // Update item in table
                    $('#item-' + id).replaceWith(getItemRow(data));
                }
            });
        } else {
            // Create new item
            $.ajax({
                url: '/items/',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name: name }),
                success: function(data) {
                    // Add new item to table
                    addItemToTable(data);
                }
            });

        }

        // Clear form
        $('#item-id').val('');
        $('#item-name').val('');
        //reload page
        location.reload();
    });
});

function addItemToTable(item) {
    $('#item-table tbody').append(getItemRow(item));
}

function getItemRow(item) {
    var row = $('<tr id="item-' + item.id + '"></tr>');
    row.append('<td>' + item.name + '</td>');
    row.append('<td><button class="btn btn-primary btn-edit">Edit</button> <button class="btn btn-danger btn-delete">Delete</button></td>');

    // Handle edit button click
    row.find('.btn-edit').click(function() {
        $('#item-id').val(item.id);
        $('#item-name').val(item.name);
    });

    // Handle delete button click
    row.find('.btn-delete').click(function() {
        $.ajax({
            url: '/items/' + item.id,
            method: 'DELETE',
            success: function() {
                // Remove item from table
                row.remove();
            }
        });
    });

    return row;
}
