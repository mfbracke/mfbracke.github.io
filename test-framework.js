
function runTests(tests) {
    document.getElementById("microversion").appendChild(
        document.createTextNode("6")
    )
    for (let test of tests) {
        try {
            test()
            reportSuccess(test.name)
        } catch (e) {
            if (e instanceof AssertionError) {
                reportFailure(test.name, `Failed assertion. ${e.msg}`)
            } else {
                reportFailure(test.name, `Threw exception of type ${typeof(e)}. ${JSON.stringify(e)}`)
            }
        }
    }
}

function assertThat(value) {
    return new Assertion(value)
}

class Assertion {
    constructor(value) {
        this.value = value
    }

    isEqualTo(other) {
        if (!_.isEqual(this.value, other)) {
            throw new AssertionError(
                `Expected values to be identical: ${JSON.stringify(this.value)} and ${JSON.stringify(other)}`
            )
        }
    }
}

class AssertionError {
    constructor(msg) {
        this.msg = msg
    }
}

function reportSuccess(testName) {
    reportResult("passed-list", testName)
}

function reportFailure(testName, msg) {
    reportResult("failed-list", `${testName}: ${msg}`)
}

function reportResult(listId, msg) {
    const listItem = document.createElement("li")
    const textNode = document.createTextNode(msg)
    listItem.appendChild(textNode)
    document.getElementById(listId).appendChild(listItem)
}
