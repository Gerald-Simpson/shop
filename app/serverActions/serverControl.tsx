'use server';
import { exec } from 'child_process';

export async function nextRebuild() {
    if (process.env.TEST_ENV === 'true') {
        console.log('test env rebuild');
        //exec('bash rebuildBash.sh', function(err, stdout, stderr) {
        exec('npm run next-rebuild-dev', function(err, stdout, stderr) {
            if (err) console.error(stderr);
            console.log(stdout);
        });
    } else if (process.env.TEST_ENV === 'false') {
        exec('npm run next-rebuild', function(err, stdout, stderr) {
            if (err) console.error(stderr);
            console.log(stdout);
        });
    }
}
