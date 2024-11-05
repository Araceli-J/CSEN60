// Tags
const searchTags = [];

// Individual elements
let parentElement = null;
const tagLists = Array.from(document.querySelectorAll("article .tags"));

// Search Functions
/**
 * retrieves the paramter given to tag in the URL
 * if the tag is null (new parent element) then there is an error and the function is exited
 * the tag is also created and searched for 
 */
function initializeSearch(newParentElement) {
  const params = new URLSearchParams(window.location.search);
  if (newParentElement === null) {
    console.error(
      "Cannot insert tags, parent element is null",
      params.getAll("tag")
    );
    return;
  }

  parentElement = newParentElement;
  for (const tag of params.getAll("tag")) {
    addSearchTerm(tag);
  }
}

/**
 * displays and hides articles based on the tag searched
 * if  no tag is search for all articles are visible
 * for the tags, it goes through a loop and finds the articles with the tags and hides the other 
 */
function hideArticles() {
  if (searchTags.length === 0) {
    for (const article of document.querySelectorAll("article")) {
      article.classList.remove("hidden");
    }
    return;
  }

  const articlesWithTags = [];
  for (const tag of searchTags) {
    articlesWithTags.push(...findArticlesWithTag(tag));
  }

  /**
   * use querySelectorAll to select all articles
   * iterate over them in a for loop
   * check if articlesWithTags array does not include the current article being iterated over,
   * then add "hidden" to that article's classList
   * else, remove "hidden" from that article's classList
   */
  const allArticles = document.querySelectorAll("article");
  for (const article of allArticles) {
    if (!articlesWithTags.includes(article)) {
      article.classList.add("hidden");
    } else {
        article.classList.remove("hidden");
    }
  }
}

/**
 * Creates a clickable tag button for a given search term (text). When clicked,
 * the button will remove the corresponding tag from both the DOM and the searchTags array.
 * This function also calls hideArticles to update the articles displayed after removal.
 */
function createTag(text) {
  /**
   * create a new element called button
   * add the class "tag" to its classList
   * set the button's textContent property to text (the passed in argument)
   */
  const button = document.createElement("button");
  button.classList.add("tag");
  button.textContent = text;

  /**
   * removes the tag button
   */
  function remove() {
    button.remove();
    const index = searchTags.indexOf(text);
    if (index !== -1) {
      searchTags.splice(index, 1);
    }

    hideArticles();
  }

  /**
   * add a click event listener to the button, and set the listener to the remove function.
   * return the button element 
   */
  button.addEventListener("click",remove);
  return button;
}

/**
 * finds the articles with the tag and returns them
 */
function findArticlesWithTag(phrase) {
  const articles = [];
  const sanitizedPhrase = phrase.toLowerCase().trim();
  for (const tl of tagLists) {
    const tags = Array.from(tl.querySelectorAll("li"));
    for (const tag of tags) {
      if (tag.textContent.toLowerCase().trim() === sanitizedPhrase) {
        articles.push(tl.parentElement);
        break;
      }
    }
  }

  return articles;
}

/**
 * when there is already a search term, it creates another search term to find articles with
 */
function addSearchTerm(text) {
  parentElement.appendChild(createTag(text));
  searchTags.push(text);
  hideArticles();
}

// Handlers

/**
 * the tag searched is added when the enter key is pressed 
 */
function onSearch(event) {
  const input = event.currentTarget;
  /**
   * If event.key equals "Enter":
   * call addSearchTerm and pass the input element's value
   * set input value to an empty string
   */
  if(event.key === "Enter"){
    addSearchTerm(input.value);
    input.value = "";
  }
}

// Main function

/**
 * initializes the search
 */

function main() {
  initializeSearch(document.querySelector("#searched-tags"));

  document
    .querySelector("input[type=search]")
    .addEventListener("keypress", onSearch);
}

// Execute main function
main();

/**
 * Order of execution for each event:
 * Pressing Enter: onsearch is called --> tag is added searchTag --> articles with tag displayed, other articles are hidden in hideArticles()
 * Clicking to Remove a Tag: remove() is called --> tag is removed from searchTags and the DOM --> either all articles are displayed or the articles without that tag is diplayed if there are other search terms
 * Loading the Page: main() is executed --> initializeSearch is then called --> onsearch is also called 
 */