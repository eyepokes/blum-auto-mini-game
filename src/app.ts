import {balance, endGame, startGame} from "./bloom";
import {generateRandomNumber, sleep} from "./utils";

(async () => {
    const authToken = "";


    const minReward = 170;
    const maxReward = 195;

    try {
        let balanceResponse = await balance(authToken);

        if(!balanceResponse) {
            console.log("Update token");
            return;
        }

        if(balanceResponse.playPasses <= 0) {
            console.log("You don't have enough tickets to farm");
            return;
        }

        for(let i = 0; i < balanceResponse.playPasses; i++) {
            console.log(`Current ticket balance ${balanceResponse.playPasses - i}`);

            let points = generateRandomNumber(minReward, maxReward);
            let {gameId} = await startGame(authToken);
            if(!gameId) {
                console.log("Update token");
                return;
            }

            let timeout = generateRandomNumber(30, 35);
            await sleep(timeout);

            let claimStatus = await endGame(gameId, points, authToken);
            if(!claimStatus || claimStatus !== "OK") {
                console.log("Update token", "Claim status is invalid", claimStatus);
                return;
            }
        }

        console.log("Finished");
    } catch (e: any) {
        console.log(e);
        console.log("Update token");
    }
})();
