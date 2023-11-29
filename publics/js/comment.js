const commentTextEl = document.querySelector("#comment");

postCommentHandler = async (event) => {
    event.preventDefault();
    const content = commentTextEl.value
    if (content.length > 0) {
        const post_id = document.location.pathname.split("/")[2];
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ content, post_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert("Comment can not be saved ");
        }
    }
}

document.querySelector("#postComment").addEventListener("click", postCommentHandler);