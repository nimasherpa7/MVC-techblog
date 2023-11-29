const titleEl = document.querySelector("#title");
const contentEl = document.querySelector("#content");
const createLink = document.querySelector("#createPost");
const cancelBtn = document.querySelector("#cancelPost");
const updateBtn = document.querySelector("#updatePost");
const deleteBtn = document.querySelector("#deletePost");

const getIdFromPathname = () => document.location.pathname.split("/").at(-1);

const redirectToDashboard = () => document.location.replace("/dashboard");

const showAlert = (message) => alert(message);

const handlePostRequest = async (url, method, bodyData) => {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
    });

    return response;
};

const cancelPostHandler = async (event) => {
    event.preventDefault();
    redirectToDashboard();
};

const updatePostHandler = async (event) => {
    event.preventDefault();
    const title = titleEl.value;
    const content = contentEl.value;

    if (title.length > 0 && content.length > 0) {
        const id = getIdFromPathname();
        const response = await handlePostRequest(`/dashboard/post/${id}`, "PUT", { title, content });

        if (response.ok) redirectToDashboard();
        else showAlert("Failed to update post.");
    } else {
        showAlert("The post must have a title and contents");
    }
};

const deletePostHandler = async (event) => {
    event.preventDefault();
    const id = getIdFromPathname();
    const response = await handlePostRequest(`/dashboard/post/${id}`, "DELETE", {});

    if (response.ok) redirectToDashboard();
    else showAlert("Failed to delete post.");
};

const createPostHandler = async (event) => {
    const title = titleEl.value;
    const content = contentEl.value;
    event.preventDefault();

    if (title.length > 0 && content.length > 0) {
        const response = await handlePostRequest("/dashboard/post", "POST", { title, content });

        if (response.ok) redirectToDashboard();
        else showAlert("Failed to create post.");
    }
};

if (createLink) {
    createLink.addEventListener("click", createPostHandler);
    cancelBtn.addEventListener("click", cancelPostHandler);
} else {
    updateBtn.addEventListener("click", updatePostHandler);
    deleteBtn.addEventListener("click", deletePostHandler);
}
