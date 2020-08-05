import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.StringTokenizer;

public class WordWrap {
    int perfectLines = 0;

    public WordWrap() throws IOException, URISyntaxException {
        Path filePath = Paths.get("thats-a-wrap/resources", "text.txt");
        String content = Files.readString(filePath);

        var str = addLinebreaks(content, 32);
        System.out.println(str);
        System.out.println("perfect lines: " + perfectLines);
    }


    public String addLinebreaks(String input, int maxLineLength) {
        StringTokenizer tok = new StringTokenizer(input, " ", true);
        StringBuilder output = new StringBuilder();
        var lineLen = 0;
        while (tok.hasMoreTokens()) {
            String word = tok.nextToken();

            if (lineLen + word.length() == maxLineLength) {
                output.append(word);
                output.append(newLine());
                lineLen = 0;
                perfectLines++;
            } else if (lineLen + word.length() > maxLineLength) {
                if (word.contains("-")) {

                    var hiphenSplit = word.split("-");
                    System.out.println("has-split: " + word);
                    hiphenSplit[0] = hiphenSplit[0] + "-";

                    if (lineLen + hiphenSplit[0].length() <= maxLineLength){
                        if(lineLen + hiphenSplit[0].length() == maxLineLength){
                            perfectLines++;
                        }
                        output.append(hiphenSplit[0]);
                        output.append(newLine());

                        lineLen = hiphenSplit[1].length();
                        output.append(hiphenSplit[1]);
                    } else {
                        output.append(newLine());
                        lineLen = word.length();
                        output.append(word);
                    }

                } else {
                    output.append(newLine());
                    lineLen = word.length();
                    output.append(word);
                }


            } else if (lineLen == 0 && word.equals(" ")) {
                //ignore space on new line
            } else {
                lineLen += word.length();
                output.append(word);
            }
        }

        return output.toString();
    }

    private String newLine() {
        return System.lineSeparator();
    }

    public static void main(String[] args) throws IOException, URISyntaxException {
        new WordWrap();
    }
}