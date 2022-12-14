const fs = require("fs").promises;

const posts = [];
const divider = "________________________________________________________________________________"

async function build() {
	const files = await fs.readdir("./posts");
	for (let i = 0; i < files.length; i++) {
		const file = await fs.readFile("./posts/" + files[i]);

		posts.push({
			title: files[i].split(" ")[1].slice(0, -3),
			date: files[i].split(" ")[0],
			body: file.toString(),
		});
	}

	let html = await fs.readFile("./_index.html");
	html = html.toString();

	html = html.replace("///posts///", posts.reduce((prev, current) => {
		prev += 
`<span style="display:inline-block;" id="${current.title}" class="page" data-date="${current.date}"><article><h2>${current.title}</h2>
${divider}
<p>${current.body}</p>
</article></span>
<a id="read_more_${current.title}" href="#${current.title}">[more...]</a>\n
`
		return prev
	}, ""))	

	fs.writeFile("./index.html", html);
};

build();