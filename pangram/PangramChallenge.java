import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


/*

Example:

The quick brown fox jumps over the lazy dog
Mr. Jock, TV quiz PhD., bags few lynx
Jackdaws love my big sphinx of quartz
Smoky the Bear secretly started the fires

Number of perfect pangrams: 1
Number of non-perfect pangrams: 2
Number of non-pangrams: 1

Output: (1 * 2) - 1 = 1

*/
public class PangramChallenge {

    public static final String PERFECT_PANGRAM = "perfect-pangram";
    public static final String NON_PERFECT_PANGRAM = "non-perfect-pangram";
    public static final String NON_PANGRAM = "non-pangram";

    private Map<String, Integer> resultMap = new HashMap<>();
    private static final String alphabet = "abcdefghijklmnopqrstuvwxyz";


    public PangramChallenge() {
        resultMap.put(PERFECT_PANGRAM, 0);
        resultMap.put(NON_PERFECT_PANGRAM, 0);
        resultMap.put(NON_PANGRAM, 0);

       /*
        Test
        var sentences = Arrays.asList(
                "The quick brown fox jumps over the lazy dog",
                "Mr. Jock, TV quiz PhD., bags few lynx",
                "Jackdaws love my big sphinx of quartz",
                "Smoky the Bear secretly started the fires"
        );*/

        getSentences().forEach(this::process);

        var perfectPangrams = resultMap.get(PERFECT_PANGRAM);
        var nonePerfect = resultMap.get(NON_PERFECT_PANGRAM);
        var none = resultMap.get(NON_PANGRAM);

        System.out.println("perfect: " + perfectPangrams);
        System.out.println("none perfect: " + nonePerfect);
        System.out.println("none: " + none);

        System.out.println("Result: " + ((perfectPangrams * nonePerfect) - none));
    }

    private List<String> getSentences() {
        try {
            System.out.println(new File(".").getAbsoluteFile());
            URL url = this.getClass().getClassLoader().getResource("data.txt");
            var file = Paths.get(url.toURI());

            return Files.readAllLines(file, Charset.defaultCharset());
        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }

    private void process(String sentenceRaw) {
        Map<Character, LetterAccrue> letterAcureMap = new LinkedHashMap<>();
        alphabet.chars().forEach(c -> letterAcureMap.put((char) c, new LetterAccrue()));

        var sentence = cleanse(sentenceRaw);

        addCountsToMap(letterAcureMap, sentence);

        if (isPerfectPangram(letterAcureMap)) {

            resultMap.computeIfPresent(PERFECT_PANGRAM, (k, v) -> v + 1);

        } else if (isNonPerfectPangram(letterAcureMap)) {

            resultMap.computeIfPresent(NON_PERFECT_PANGRAM, (k, v) -> v + 1);

        } else {

            resultMap.computeIfPresent(NON_PANGRAM, (k, v) -> v + 1);
        }
    }

    private boolean isNonPerfectPangram(Map<Character, LetterAccrue> letterAcureMap) {
        return letterAcureMap.entrySet().stream()
                .allMatch(accrue -> accrue.getValue().count >= 1);
    }

    private boolean isPerfectPangram(Map<Character, LetterAccrue> letterAcureMap) {
        return letterAcureMap.entrySet().stream()
                .allMatch(accrue -> accrue.getValue().count == 1);
    }

    private String cleanse(String sentence) {
        return sentence.replaceAll("[^a-zA-Z]", "").toLowerCase();
    }

    private void addCountsToMap(Map<Character, LetterAccrue> letterAcureMap, String sentence) {
        sentence.chars().forEach(letter -> letterAcureMap.get((char) letter).count++);
    }

    public static void main(String[] args) {
        new PangramChallenge();

    }

    class LetterAccrue {
        public int count = 0;
    }
}


