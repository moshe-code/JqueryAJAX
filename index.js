$(() => {


    const initTable = () => {
        let tableStr = `
        <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">body</th>
                    </tr>
                </thead>
                <tbody id="list-table-body">
                   
                </tbody>
                </table>


    `
        $('#list-table').append(tableStr)

    }

    initTable()

    const loadDataToTable = (list) => {

        let tableBodyElement = $("#list-table-body")

        let rows = ''
        tableBodyElement.empty()

        list.forEach(element => {
            rows +=`
            <tr>
            <th scope="row">${element.id}</th>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.body}</td>
          </tr>
            
            `
        });
        
        tableBodyElement.append(rows)
    }

    $("#load-all-comments").click(function (e) {
        e.preventDefault()

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/comments',
            success: data => {
                loadDataToTable(data)
            }
        })

    })

    $("#post-id-search").click(function (e) {
        e.preventDefault()
        let postId = $("#post-id-input").val()
        console.log(postId)

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
            success: data => {
                loadDataToTable(data)
            }
        })

    })
    $("#name-filter-input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#list-table-body tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });


})