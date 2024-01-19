import java.util.Scanner;

public class source_code {

    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);

        int num1 = reader.nextInt();
        int num2 = reader.nextInt();

        System.out.println(num1+num2);

        reader.close();
    }
}
